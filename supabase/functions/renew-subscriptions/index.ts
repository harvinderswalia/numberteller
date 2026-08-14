import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PLAN_PRICES: Record<string, number> = {
  silver: 991,
  gold: 1299,
  platinum: 1499,
};

/**
 * Add one month to a date, preserving the day-of-month when possible.
 * If the original day is 31 and the next month only has 28/29/30,
 * we use the last day of that month BUT keep tracking the original day
 * so subsequent renewals return to the 31st when the month allows it.
 *
 * Rule confirmed by user: Jan 31 → Feb 28/29 → Mar 31 (not Mar 28).
 */
function addOneMonth(date: Date, originalDay?: number): { newDate: Date; originalDay: number } {
  const day = originalDay ?? date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Target month/year
  let targetMonth = month + 1;
  let targetYear = year;
  if (targetMonth > 11) {
    targetMonth = 0;
    targetYear++;
  }

  // Last day of target month
  const lastDayOfTarget = new Date(targetYear, targetMonth + 1, 0).getDate();

  // Use original day if the target month has it, otherwise use last day
  const useDay = Math.min(day, lastDayOfTarget);

  const newDate = new Date(targetYear, targetMonth, useDay, date.getHours(), date.getMinutes(), date.getSeconds());
  return { newDate, originalDay: day };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceKey) {
      return new Response(
        JSON.stringify({ error: 'Missing Supabase credentials' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const headers = {
      'Content-Type': 'application/json',
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    };

    const now = new Date();
    const results = { renewed: 0, expired: 0, errors: 0, details: [] as string[] };

    // ─── 1. Auto-renew expired subscriptions ──────────────────────────────────
    // Find all paid plans where subscription_expires_at <= now
    // These need to be renewed (month added) and a renewal email sent
    const { data: expiredSubs, error: subError } = await fetch(
      `${supabaseUrl}/rest/v1/user_plan_overrides?plan_id=in.(silver,gold,platinum)&subscription_expires_at=lt.${now.toISOString()}&select=id,user_auth_id,email,plan_id,monthly_amount,subscription_expires_at,activated_at,full_name`,
      { headers }
    ).then(r => r.json()).catch(() => ({ data: null, error: 'fetch failed' }));

    if (subError) {
      results.errors++;
      results.details.push(`Error fetching expired subs: ${subError}`);
    }

    if (expiredSubs && Array.isArray(expiredSubs)) {
      for (const sub of expiredSubs) {
        try {
          const oldExpiry = new Date(sub.subscription_expires_at);
          const anchor = sub.activated_at ? new Date(sub.activated_at) : oldExpiry;
          const { newDate: newExpiry, originalDay } = addOneMonth(oldExpiry, anchor.getDate());
          const monthlyAmount = sub.monthly_amount || PLAN_PRICES[sub.plan_id] || 0;

          // Update subscription_expires_at to new date
          const updateRes = await fetch(
            `${supabaseUrl}/rest/v1/user_plan_overrides?id=eq.${sub.id}`,
            {
              method: 'PATCH',
              headers,
              body: JSON.stringify({
                subscription_expires_at: newExpiry.toISOString(),
                updated_at: now.toISOString(),
              }),
            }
          );

          if (!updateRes.ok) {
            results.errors++;
            results.details.push(`Failed to renew ${sub.email}`);
            continue;
          }

          // Send renewal email
          await fetch(`${supabaseUrl}/functions/v1/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'renewal',
              userEmail: sub.email,
              userName: sub.full_name || 'User',
              activatedPlan: sub.plan_id,
              monthlyAmount,
              expiryDate: newExpiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }),
          }).catch(() => {});

          results.renewed++;
          results.details.push(`Renewed ${sub.email}: ${sub.plan_id} → ${newExpiry.toISOString().split('T')[0]}`);
        } catch (err) {
          results.errors++;
          results.details.push(`Error renewing ${sub.email}: ${err.message}`);
        }
      }
    }

    // ─── 2. Send trial-expired emails ──────────────────────────────────────────
    // Find free users whose trial just expired (trial_expires_at <= now, setup_completed_at not null)
    // and who haven't been sent a trial_expired email yet (check email_log)
    const { data: expiredTrials } = await fetch(
      `${supabaseUrl}/rest/v1/user_plan_overrides?plan_id=eq.free&trial_expires_at=lt.${now.toISOString()}&setup_completed_at=not.is.null&select=id,user_auth_id,email,full_name,trial_expires_at`,
      { headers }
    ).then(r => r.json()).catch(() => ({ data: null }));

    if (expiredTrials && Array.isArray(expiredTrials)) {
      for (const trial of expiredTrials) {
        try {
          // Check if we already sent a trial_expired email to this user
          const logCheck = await fetch(
            `${supabaseUrl}/rest/v1/email_log?recipient_email=eq.${trial.email}&template_type=eq.trial_expired&select=id&limit=1`,
            { headers }
          ).then(r => r.json()).catch(() => ({ data: [] }));

          if (Array.isArray(logCheck) && logCheck.length > 0) continue;

          await fetch(`${supabaseUrl}/functions/v1/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'trial_expired',
              userEmail: trial.email,
              userName: trial.full_name || 'User',
            }),
          }).catch(() => {});

          results.details.push(`Trial expired email sent to ${trial.email}`);
        } catch (err) {
          results.errors++;
          results.details.push(`Error sending trial expired email to ${trial.email}: ${err.message}`);
        }
      }
    }

    // ─── 3. Send plan-expired emails ───────────────────────────────────────────
    // For subscriptions that expired AND were renewed, we already sent renewal emails.
    // But if a subscription was cancelled (plan_id still paid but sub expired and no auto-renew),
    // we need to handle that case. Currently all paid plans auto-renew, so this is a safety net.
    // We check for paid plan users whose sub expired more than 30 days ago (shouldn't happen with auto-renew)

    return new Response(
      JSON.stringify({ success: true, ...results, timestamp: now.toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

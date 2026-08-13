import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailPayload {
  type: 'activation_request' | 'reminder' | 'trial_expired' | 'plan_activated' | 'renewal' | 'cancellation' | 'plan_expired';
  userEmail: string;
  userName?: string;
  phone?: string;
  requestedPlan?: string;
  requestId?: string;
  activatedPlan?: string;
  monthlyAmount?: number;
  expiryDate?: string;
  adminEmail?: string;
}

const ADMIN_EMAIL = 'harvenderswalia@gmail.com';

function createEmailBody(type: string, p: EmailPayload): { subject: string; html: string; recipient: string } {
  const userName = p.userName || 'User';

  switch (type) {
    case 'activation_request': {
      return {
        recipient: ADMIN_EMAIL,
        subject: `[Activation Request] ${userName} — ${p.requestedPlan} plan`,
        html: `
          <h2>New Plan Activation Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${userName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${p.userEmail}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${p.phone || '—'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Requested Plan</td><td style="padding:8px;border:1px solid #ddd;">${p.requestedPlan}</td></tr>
          </table>
          <p style="margin-top:16px;">Review and approve this request in the Super Admin portal.</p>
        `,
      };
    }

    case 'reminder': {
      return {
        recipient: ADMIN_EMAIL,
        subject: `[Reminder] ${userName} is waiting for plan activation`,
        html: `
          <h2>Activation Reminder</h2>
          <p>${userName} (${p.userEmail}) has sent a reminder about their pending activation request.</p>
          <p>Request ID: ${p.requestId || '—'}</p>
          <p style="margin-top:16px;">Please review and respond at your earliest convenience.</p>
        `,
      };
    }

    case 'trial_expired': {
      return {
        recipient: p.userEmail,
        subject: 'Your NumberTeller Free Trial Has Ended',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a5f;">Hi ${userName},</h2>
            <p>Your 3-day free trial on NumberTeller has ended. We hope you enjoyed exploring the platform!</p>
            <p>To continue using all the numerology tools, choose a plan and request activation:</p>
            <div style="margin:24px 0;">
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '') || ''}" style="background:#2563eb;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Activate a Plan</a>
            </div>
            <p>Or message us directly on WhatsApp: +971 56 504 3131</p>
            <p style="color:#666;font-size:14px;margin-top:24px;">— The NumberTeller Team</p>
          </div>
        `,
      };
    }

    case 'plan_activated': {
      return {
        recipient: p.userEmail,
        subject: `Your ${p.activatedPlan} Plan is Now Active!`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a5f;">Welcome to ${p.activatedPlan}, ${userName}!</h2>
            <p>Great news — your <strong>${p.activatedPlan}</strong> plan is now active.</p>
            <table style="border-collapse:collapse;margin:16px 0;">
              <tr><td style="padding:6px 12px;color:#666;">Plan</td><td style="padding:6px 12px;font-weight:bold;">${p.activatedPlan}</td></tr>
              <tr><td style="padding:6px 12px;color:#666;">Monthly Amount</td><td style="padding:6px 12px;font-weight:bold;">₹${p.monthlyAmount || 0}</td></tr>
              <tr><td style="padding:6px 12px;color:#666;">Valid Until</td><td style="padding:6px 12px;font-weight:bold;">${p.expiryDate || '—'}</td></tr>
            </table>
            <p>You can now access all the tools included in your plan. Log in to get started!</p>
            <p style="color:#666;font-size:14px;margin-top:24px;">— The NumberTeller Team</p>
          </div>
        `,
      };
    }

    case 'renewal': {
      return {
        recipient: p.userEmail,
        subject: `Your ${p.activatedPlan} Plan Has Been Renewed`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a5f;">Renewal Confirmation, ${userName}</h2>
            <p>Your <strong>${p.activatedPlan}</strong> plan has been renewed for another month.</p>
            <table style="border-collapse:collapse;margin:16px 0;">
              <tr><td style="padding:6px 12px;color:#666;">Amount Charged</td><td style="padding:6px 12px;font-weight:bold;">₹${p.monthlyAmount || 0}</td></tr>
              <tr><td style="padding:6px 12px;color:#666;">New Expiry Date</td><td style="padding:6px 12px;font-weight:bold;">${p.expiryDate || '—'}</td></tr>
            </table>
            <p>Thank you for continuing with NumberTeller!</p>
            <p style="color:#666;font-size:14px;margin-top:24px;">— The NumberTeller Team</p>
          </div>
        `,
      };
    }

    case 'cancellation': {
      return {
        recipient: p.userEmail,
        subject: `Your ${p.activatedPlan} Plan Subscription Cancelled`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a5f;">Subscription Cancelled, ${userName}</h2>
            <p>Your <strong>${p.activatedPlan}</strong> plan subscription has been cancelled.</p>
            <p>You'll continue to have access until <strong>${p.expiryDate || 'the end of your current billing period'}</strong>.</p>
            <p>After that, you can re-activate at any time by requesting a new plan activation.</p>
            <p style="color:#666;font-size:14px;margin-top:24px;">— The NumberTeller Team</p>
          </div>
        `,
      };
    }

    case 'plan_expired': {
      return {
        recipient: p.userEmail,
        subject: 'Your NumberTeller Plan Has Expired',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#1e3a5f;">Hi ${userName},</h2>
            <p>Your <strong>${p.activatedPlan}</strong> plan has expired. Access to premium tools is now restricted.</p>
            <p>To continue using NumberTeller, please request a new plan activation:</p>
            <div style="margin:24px 0;">
              <a href="#" style="background:#2563eb;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Reactivate Plan</a>
            </div>
            <p>Or message us on WhatsApp: +971 56 504 3131</p>
            <p style="color:#666;font-size:14px;margin-top:24px;">— The NumberTeller Team</p>
          </div>
        `,
      };
    }

    default:
      return { subject: 'NumberTeller Notification', html: '<p>You have a new notification.</p>', recipient: p.userEmail };
  }
}

async function sendSMTPEmail(to: string, subject: string, html: string): Promise<void> {
  const smtpHost = Deno.env.get('SMTP_HOST');
  const smtpPort = Deno.env.get('SMTP_PORT');
  const smtpUser = Deno.env.get('SMTP_USER');
  const smtpPass = Deno.env.get('SMTP_PASS');
  const fromEmail = Deno.env.get('SMTP_FROM_EMAIL') || 'noreply@numberteller.com';
  const fromName = Deno.env.get('SMTP_FROM_NAME') || 'NumberTeller';

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn('SMTP credentials not configured. Email will be logged but not sent.');
    return;
  }

  // Using Deno's native TCP for SMTP
  const conn = await Deno.connect({
    hostname: smtpHost,
    port: parseInt(smtpPort || '587'),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  async function send(cmd: string): Promise<string> {
    await conn.write(encoder.encode(cmd + '\r\n'));
    const buf = new Uint8Array(1024);
    const n = await conn.read(buf);
    return decoder.decode(buf.subarray(0, n ?? 0));
  }

  await send('EHLO numberteller.com');
  await send('AUTH LOGIN');
  await btoa(smtpUser);  // base64
  await conn.write(encoder.encode(btoa(smtpUser) + '\r\n'));
  await conn.read(new Uint8Array(1024));
  await conn.write(encoder.encode(btoa(smtpPass) + '\r\n'));
  await conn.read(new Uint8Array(1024));
  await send(`MAIL FROM:<${fromEmail}>`);
  await send(`RCPT TO:<${to}>`);
  await send('DATA');

  const emailContent = [
    `From: ${fromName} <${fromEmail}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    '',
    html,
    '.',
  ].join('\r\n');

  await send(emailContent);
  await send('QUIT');
  conn.close();
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();
    const { subject, html, recipient } = createEmailBody(payload.type, payload);

    let status: 'sent' | 'failed' = 'sent';
    let errorMessage: string | null = null;

    try {
      await sendSMTPEmail(recipient, subject, html);
    } catch (err) {
      status = 'failed';
      errorMessage = err.message || String(err);
      console.error('SMTP send failed:', errorMessage);
    }

    // Log to email_log table via service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (supabaseUrl && serviceKey) {
      await fetch(`${supabaseUrl}/rest/v1/email_log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          recipient_email: recipient,
          template_type: payload.type,
          status,
          error_message: errorMessage,
        }),
      }).catch(() => {});
    }

    return new Response(
      JSON.stringify({ success: status === 'sent', status, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

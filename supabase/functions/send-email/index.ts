import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ADMIN_EMAIL = "sales@confiexdataroom.com";
const FROM_EMAIL = "alerts@numberteller.com";
const FROM_NAME = "NumberTeller";
const RESEND_API_URL = "https://api.resend.com/emails";

interface EmailPayload {
  type:
    | "activation_request"
    | "reminder"
    | "trial_expired"
    | "plan_activated"
    | "renewal"
    | "cancellation"
    | "plan_expired"
    | "contact_form"
    | "welcome"
    | "request_rejected"
    | "access_revoked"
    | "signup_alert";
  userEmail: string;
  userName?: string;
  phone?: string;
  requestedPlan?: string;
  requestId?: string;
  activatedPlan?: string;
  monthlyAmount?: number;
  expiryDate?: string;
  adminNotes?: string;
  subject?: string;
  message?: string;
  formName?: string;
  formEmail?: string;
  formSubject?: string;
  formMessage?: string;
}

function brandedWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NumberTeller</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;min-height:100vh;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1e293b;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#0f172a 100%);padding:32px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="width:44px;height:44px;background:linear-gradient(135deg,#f59e0b,#ea580c);border-radius:12px;text-align:center;vertical-align:middle;">
                    <span style="font-size:22px;font-weight:800;color:#fff;line-height:44px;">N</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <span style="font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.5px;">numberteller.com</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;line-height:1.5;">
                Confiex Data Room Private Limited<br/>
                Unit 302, Bldg 2, New Sonal Industrial Estate,<br/>
                Kachpada, Link Road, Malad West, Mumbai 400064
              </p>
              <p style="margin:0;font-size:12px;color:#475569;">
                © 2026 numberteller.com — All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function btn(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;margin:20px 0;">${label}</a>`;
}

function infoTable(rows: [string, string][]): string {
  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px;color:#94a3b8;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.04);">${label}</td><td style="padding:10px 16px;color:#fff;font-weight:600;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.04);">${value}</td></tr>`
    )
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:rgba(255,255,255,0.03);border-radius:12px;overflow:hidden;">${rowsHtml}</table>`;
}

function createEmailBody(
  type: string,
  p: EmailPayload
): { subject: string; html: string; recipient: string } {
  const userName = p.userName || "there";
  const siteUrl = Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", "") || "https://numberteller.com";

  switch (type) {
    case "activation_request": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;">New Plan Activation Request</h2>
        <p style="margin:0 0 20px;color:#94a3b8;font-size:15px;">A user has requested plan activation. Review and approve in the admin portal.</p>
        ${infoTable([
          ["Name", p.userName || "—"],
          ["Email", p.userEmail || "—"],
          ["Phone", p.phone || "—"],
          ["Requested Plan", (p.requestedPlan || "—").toUpperCase()],
        ])}
        <p style="color:#94a3b8;font-size:14px;margin:16px 0 0;">Log in to the Super Admin portal to approve or reject this request.</p>
      `;
      return {
        recipient: ADMIN_EMAIL,
        subject: `[Activation Request] ${userName} — ${(p.requestedPlan || "").toUpperCase()} Plan`,
        html: brandedWrapper(body),
      };
    }

    case "reminder": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;">Activation Reminder</h2>
        <p style="margin:0 0 16px;color:#94a3b8;font-size:15px;">${userName} (${p.userEmail}) has sent a reminder about their pending activation request.</p>
        ${infoTable([
          ["Request ID", p.requestId || "—"],
          ["User", userName],
          ["Email", p.userEmail],
        ])}
        <p style="color:#94a3b8;font-size:14px;">Please review and respond at your earliest convenience.</p>
      `;
      return {
        recipient: ADMIN_EMAIL,
        subject: `[Reminder] ${userName} is waiting for plan activation`,
        html: brandedWrapper(body),
      };
    }

    case "trial_expired": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Hi ${userName},</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Your 3-day free trial on NumberTeller has ended. We hope you enjoyed exploring the platform!</p>
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">To continue using all the numerology tools, choose a plan and request activation:</p>
        ${btn("Activate a Plan", siteUrl)}
        <p style="color:#94a3b8;font-size:14px;margin:8px 0 0;">Or message us directly on WhatsApp: +91 7900075531</p>
      `;
      return {
        recipient: p.userEmail,
        subject: "Your NumberTeller Free Trial Has Ended",
        html: brandedWrapper(body),
      };
    }

    case "plan_activated": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Welcome to ${p.activatedPlan}, ${userName}!</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Great news — your <strong style="color:#f59e0b;">${p.activatedPlan}</strong> plan is now active.</p>
        ${infoTable([
          ["Plan", p.activatedPlan || "—"],
          ["Monthly Amount", `₹${p.monthlyAmount || 0}`],
          ["Valid Until", p.expiryDate || "—"],
        ])}
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">You can now access all the tools included in your plan. Log in to get started!</p>
        ${btn("Go to Dashboard", siteUrl)}
      `;
      return {
        recipient: p.userEmail,
        subject: `Your ${p.activatedPlan} Plan is Now Active!`,
        html: brandedWrapper(body),
      };
    }

    case "renewal": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Renewal Confirmation, ${userName}</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Your <strong style="color:#f59e0b;">${p.activatedPlan}</strong> plan has been renewed for another month.</p>
        ${infoTable([
          ["Amount Charged", `₹${p.monthlyAmount || 0}`],
          ["New Expiry Date", p.expiryDate || "—"],
        ])}
        <p style="margin:0;color:#cbd5e1;font-size:15px;">Thank you for continuing with NumberTeller!</p>
      `;
      return {
        recipient: p.userEmail,
        subject: `Your ${p.activatedPlan} Plan Has Been Renewed`,
        html: brandedWrapper(body),
      };
    }

    case "cancellation": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Subscription Cancelled, ${userName}</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Your <strong style="color:#f59e0b;">${p.activatedPlan}</strong> plan subscription has been cancelled.</p>
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">You'll continue to have access until <strong>${p.expiryDate || "the end of your current billing period"}</strong>.</p>
        <p style="margin:0;color:#94a3b8;font-size:14px;">After that, you can re-activate at any time by requesting a new plan activation.</p>
      `;
      return {
        recipient: p.userEmail,
        subject: `Your ${p.activatedPlan} Plan Subscription Cancelled`,
        html: brandedWrapper(body),
      };
    }

    case "plan_expired": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Hi ${userName},</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Your <strong style="color:#f59e0b;">${p.activatedPlan}</strong> plan has expired. Access to premium tools is now restricted.</p>
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">To continue using NumberTeller, please request a new plan activation:</p>
        ${btn("Reactivate Plan", siteUrl)}
        <p style="color:#94a3b8;font-size:14px;margin:8px 0 0;">Or message us on WhatsApp: +91 7900075531</p>
      `;
      return {
        recipient: p.userEmail,
        subject: "Your NumberTeller Plan Has Expired",
        html: brandedWrapper(body),
      };
    }

    case "request_rejected": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Hi ${userName},</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">We've reviewed your activation request for the <strong style="color:#f59e0b;">${p.requestedPlan}</strong> plan. Unfortunately, we're unable to approve it at this time.</p>
        ${p.adminNotes ? `<div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px 20px;margin:20px 0;"><p style="margin:0 0 6px;font-size:13px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Notes from our team</p><p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.6;">${p.adminNotes}</p></div>` : ""}
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">If you believe this is an error or have questions, please contact us:</p>
        ${btn("Contact Support", siteUrl)}
        <p style="color:#94a3b8;font-size:14px;margin:8px 0 0;">WhatsApp: +91 7900075531</p>
      `;
      return {
        recipient: p.userEmail,
        subject: `Update on Your ${p.requestedPlan} Plan Activation Request`,
        html: brandedWrapper(body),
      };
    }

    case "contact_form": {
      const subjectLabel: Record<string, string> = {
        general: "General Enquiry",
        pricing: "Pricing & Plans",
        support: "Technical Support",
        billing: "Billing Issue",
        feedback: "Feature Feedback",
      };
      const body = `
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;">New Contact Form Submission</h2>
        <p style="margin:0 0 20px;color:#94a3b8;font-size:15px;">A visitor has submitted the contact form on numberteller.com.</p>
        ${infoTable([
          ["Name", p.formName || "—"],
          ["Email", p.formEmail || "—"],
          ["Subject", subjectLabel[p.formSubject || ""] || p.formSubject || "—"],
        ])}
        <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px 20px;margin:20px 0;">
          <p style="margin:0 0 6px;font-size:13px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
          <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.7;white-space:pre-wrap;">${p.formMessage || "—"}</p>
        </div>
        <p style="color:#94a3b8;font-size:14px;">Reply directly to this person at ${p.formEmail || "their email address"}.</p>
      `;
      return {
        recipient: ADMIN_EMAIL,
        subject: `[Contact Form] ${subjectLabel[p.formSubject || ""] || p.formSubject || "New Submission"} — ${p.formName || "Visitor"}`,
        html: brandedWrapper(body),
      };
    }

    case "access_revoked": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Hi ${userName},</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Your access to NumberTeller has been revoked by our admin team. Your plan has been reset and premium tools are no longer available.</p>
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">If you believe this is an error or would like to restore access, please contact us:</p>
        ${btn("Contact Support", siteUrl)}
        <p style="color:#94a3b8;font-size:14px;margin:8px 0 0;">WhatsApp: +91 7900075531</p>
      `;
      return {
        recipient: p.userEmail,
        subject: "Your NumberTeller Access Has Been Revoked",
        html: brandedWrapper(body),
      };
    }

    case "signup_alert": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;">New User Sign-Up</h2>
        <p style="margin:0 0 20px;color:#94a3b8;font-size:15px;">A new user has registered on NumberTeller with a 3-day free trial.</p>
        ${infoTable([
          ["Email", p.userEmail || "—"],
        ])}
        <p style="color:#94a3b8;font-size:14px;margin:16px 0 0;">View this user in the Super Admin portal.</p>
      `;
      return {
        recipient: ADMIN_EMAIL,
        subject: `[New Sign-Up] ${p.userEmail || "New User"}`,
        html: brandedWrapper(body),
      };
    }

    case "welcome": {
      const body = `
        <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#fff;">Welcome to NumberTeller, ${userName}!</h2>
        <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">Your account has been created. You now have access to a 3-day free trial of our numerology platform.</p>
        <p style="margin:0 0 8px;color:#cbd5e1;font-size:15px;line-height:1.6;">Here's what you can do:</p>
        <ul style="margin:0 0 16px;padding-left:20px;color:#cbd5e1;font-size:15px;line-height:1.8;">
          <li>Calculate your core numerology numbers</li>
          <li>Explore your Lo Shu Grid and transit charts</li>
          <li>Check compatibility with a partner</li>
          <li>Get AI-powered Tarot readings</li>
        </ul>
        ${btn("Start Exploring", siteUrl)}
        <p style="color:#94a3b8;font-size:14px;margin:16px 0 0;">Need help? Message us on WhatsApp: +91 7900075531</p>
      `;
      return {
        recipient: p.userEmail,
        subject: "Welcome to NumberTeller — Your Free Trial Starts Now!",
        html: brandedWrapper(body),
      };
    }

    default: {
      const body = `<p style="color:#cbd5e1;font-size:15px;">You have a new notification from NumberTeller.</p>`;
      return {
        recipient: p.userEmail,
        subject: "NumberTeller Notification",
        html: brandedWrapper(body),
      };
    }
  }
}

async function sendResendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");

  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured. Email will be logged but not sent.");
    console.log(`[Email] To: ${to} | Subject: ${subject}`);
    return;
  }

  const body: Record<string, unknown> = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [to],
    subject,
    html,
  };
  if (replyTo) body.reply_to = replyTo;

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend API error ${res.status}: ${errText}`);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();
    const { subject, html, recipient } = createEmailBody(payload.type, payload);

    // Contact form replies go to the submitter; all other emails reply to admin
    const replyTo = payload.type === "contact_form" ? (payload.formEmail || ADMIN_EMAIL) : ADMIN_EMAIL;

    let status: "sent" | "failed" = "sent";
    let errorMessage: string | null = null;

    try {
      await sendResendEmail(recipient, subject, html, replyTo);
    } catch (err) {
      status = "failed";
      errorMessage = err.message || String(err);
      console.error("Resend send failed:", errorMessage);
    }

    // Log to email_log table via service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseUrl && serviceKey) {
      await fetch(`${supabaseUrl}/rest/v1/email_log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      JSON.stringify({ success: status === "sent", status, error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO = process.env.CONTACT_TO_EMAIL;
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

/**
 * Lead-capture endpoint for the Section 2 "AI chat" form.
 * Body: { message: string, replyEmail?: string }
 * - message only        -> "new message" email to Isaac.
 * - message + replyEmail -> follow-up email flagging the reply address.
 */
export async function POST(req: Request) {
  let body: { message?: string; replyEmail?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  const replyEmail = body.replyEmail?.trim();

  const apiKey = process.env.RESEND_API_KEY;
  // Secrets not configured yet (e.g. local dev): no-op success so the UI works.
  if (!apiKey || !TO) {
    console.info("[contact] no RESEND_API_KEY/CONTACT_TO_EMAIL — skipping send", {
      message,
      replyEmail,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: replyEmail
      ? `Portfolio lead — reply to ${replyEmail}`
      : "Portfolio lead — new message",
    text: replyEmail ? `${message}\n\nReply-to: ${replyEmail}` : message,
    ...(replyEmail ? { replyTo: replyEmail } : {}),
  });

  if (error) {
    console.error("[contact] resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered: true });
}

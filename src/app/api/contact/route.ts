import { NextResponse } from "next/server";

export const runtime = "edge";

const MAX = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

async function verifyTurnstile(token: string, ip: string | null) {
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(req: Request) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, TURNSTILE_SECRET_KEY } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !TURNSTILE_SECRET_KEY) {
    return fail("Contact form is not configured yet.", 503);
  }

  // Only accept submissions from this site.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return fail("Forbidden", 403);

  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: real users never fill this in. Pretend success so bots learn nothing.
  if (typeof input.website === "string" && input.website) return NextResponse.json({ ok: true });

  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim();
  const message = String(input.message ?? "").trim();
  const token = String(input["cf-turnstile-response"] ?? "");

  if (!name || !message || !EMAIL_RE.test(email)) return fail("Please fill in all fields with a valid email.", 400);
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    return fail("One of the fields is too long.", 400);
  }
  if (!token) return fail("Please complete the captcha.", 400);

  const ok = await verifyTurnstile(token, req.headers.get("cf-connecting-ip"));
  if (!ok) return fail("Captcha failed. Please try again.", 400);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio contact from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) return fail("Could not send your message. Please try again later.", 502);
  return NextResponse.json({ ok: true });
}

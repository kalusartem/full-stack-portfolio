"use client";

import Script from "next/script";
import { useState, type FormEvent } from "react";

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

const input =
  "w-full rounded-xl border border-line-strong bg-field px-4 py-3 text-foreground placeholder:text-faint focus:border-line-focus";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
    window.turnstile?.reset();
  }

  if (status === "sent") {
    return (
      <p role="status" className="mt-8 rounded-2xl border border-line bg-surface p-6 text-soft">
        Thanks! Your message is on its way. I&apos;ll reply as soon as I can.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-xl space-y-4 text-left">
      <div>
        <label htmlFor="cf-name" className="mb-1 block text-sm text-muted">Name</label>
        <input id="cf-name" name="name" required maxLength={100} autoComplete="name" className={input} />
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1 block text-sm text-muted">Email</label>
        <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1 block text-sm text-muted">Message</label>
        <textarea id="cf-message" name="message" required maxLength={5000} rows={5} className={input} />
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {siteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
        </>
      ) : null}

      {status === "error" ? (
        <p role="alert" className="text-sm text-danger">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-2xl bg-primary px-6 py-3 font-medium text-on-primary transition duration-300 hover:scale-[1.03] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

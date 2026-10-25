"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

import { createClient } from "@/lib/supabase-client";

type Factor = { id: string; friendly_name?: string; status: "verified" | "unverified"; created_at: string };
type Enrollment = { factorId: string; qr: string; secret: string };

const card = "rounded-[2rem] border border-line bg-surface p-6 backdrop-blur-xl md:p-8";
const input =
  "w-40 rounded-2xl border border-line bg-field px-4 py-3 text-center font-mono text-lg tracking-[0.3em] text-foreground outline-none transition placeholder:text-faint focus:border-line-focus";
const primaryBtn =
  "rounded-2xl bg-primary px-5 py-3 font-medium text-on-primary transition hover:scale-[1.02] disabled:opacity-60";
const ghostBtn =
  "rounded-2xl border border-line-strong bg-surface px-5 py-3 font-medium text-foreground transition hover:bg-surface-strong disabled:opacity-60";

export default function SecurityClient({
  challenge,
  next,
  required,
}: {
  challenge: boolean;
  next: string;
  required: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [level, setLevel] = useState<"aal1" | "aal2" | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);

  const fetchState = useCallback(async () => {
    const supabase = createClient();
    const [list, aal] = await Promise.all([
      supabase.auth.mfa.listFactors(),
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    ]);
    return {
      error: list.error?.message ?? null,
      factors: (list.data?.all ?? []).filter((f) => f.factor_type === "totp") as Factor[],
      level: aal.data?.currentLevel === "aal2" ? ("aal2" as const) : ("aal1" as const),
    };
  }, []);

  const refresh = useCallback(async () => {
    const state = await fetchState();
    setFactors(state.factors);
    setLevel(state.level);
    setLoading(false);
    if (state.error) setMsg({ kind: "error", text: state.error });
  }, [fetchState]);

  useEffect(() => {
    let active = true;
    fetchState().then((state) => {
      if (!active) return;
      setFactors(state.factors);
      setLevel(state.level);
      setLoading(false);
      if (state.error) setMsg({ kind: "error", text: state.error });
    });
    return () => {
      active = false;
    };
  }, [fetchState]);

  const verified = factors.filter((f) => f.status === "verified");
  const needsStepUp = verified.length > 0 && level !== "aal2";

  // Challenge + verify a code against a factor; on success the session is upgraded to aal2.
  async function verify(factorId: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: code.trim() });
    if (error) throw error;
    setCode("");
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setMsg(null);
    try {
      await action();
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : "Something went wrong." });
    }
    setBusy(false);
  }

  const startEnroll = () =>
    run(async () => {
      const supabase = createClient();
      // A previous abandoned enrollment would block a new one, so clear unverified factors first.
      for (const f of factors.filter((f) => f.status === "unverified")) {
        await supabase.auth.mfa.unenroll({ factorId: f.id });
      }
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", issuer: "Portfolio Admin" });
      if (error) throw error;
      setEnrollment({ factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
    });

  const cancelEnroll = () =>
    run(async () => {
      if (enrollment) await createClient().auth.mfa.unenroll({ factorId: enrollment.factorId });
      setEnrollment(null);
      setCode("");
      await refresh();
    });

  const confirmEnroll = (e: FormEvent) => {
    e.preventDefault();
    if (!enrollment) return;
    run(async () => {
      await verify(enrollment.factorId);
      setEnrollment(null);
      await refresh();
      setMsg({ kind: "ok", text: "Authenticator app enabled." });
    });
  };

  const stepUp = (e: FormEvent) => {
    e.preventDefault();
    run(async () => {
      await verify(verified[0].id);
      await refresh();
      // A hard navigation makes the middleware see the upgraded session cookie.
      if (challenge) window.location.assign(next);
      else setMsg({ kind: "ok", text: "Verified. This session now has two-factor assurance." });
    });
  };

  const remove = (factor: Factor) => {
    if (!window.confirm("Remove this authenticator? Your admin account will only be protected by sign-in.")) return;
    run(async () => {
      const { error } = await createClient().auth.mfa.unenroll({ factorId: factor.id });
      if (error) throw error;
      await refresh();
      setMsg({ kind: "ok", text: "Authenticator removed." });
    });
  };

  if (loading) {
    return <div className={`${card} animate-pulse text-subtle`}>Loading security settings…</div>;
  }

  const codeField = (label: string) => (
    <div className="grid gap-2">
      <label htmlFor="mfa-code" className="text-sm text-soft">{label}</label>
      <input
        id="mfa-code"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d{6}"
        maxLength={6}
        required
        placeholder="000000"
        className={input}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {msg ? (
        <p
          role={msg.kind === "error" ? "alert" : "status"}
          className={`rounded-2xl border px-4 py-3 text-sm ${
            msg.kind === "error"
              ? "border-danger-line bg-danger-soft text-danger"
              : "border-success-line bg-success-soft text-success"
          }`}
        >
          {msg.text}
        </p>
      ) : null}

      <section className={card}>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Status</h2>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${
              verified.length > 0 ? "bg-success-soft text-success" : "bg-surface-strong text-muted"
            }`}
          >
            {verified.length > 0 ? "Enabled" : "Not set up"}
          </span>
        </div>
        <p className="mt-3 text-sm leading-7 text-muted">
          This session: {level === "aal2" ? "verified with an authenticator code (aal2)." : "signed in without a second factor (aal1)."}{" "}
          {required
            ? "Two-factor is currently required to use the admin area."
            : "Two-factor is optional right now (REQUIRE_ADMIN_MFA is not enabled)."}
        </p>
      </section>

      {needsStepUp ? (
        <section className={card}>
          <h2 className="text-2xl font-semibold tracking-tight">
            {challenge ? "Enter your authentication code" : "Verify this session"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Open your authenticator app and enter the current 6-digit code.
          </p>
          <form onSubmit={stepUp} className="mt-5 flex flex-wrap items-end gap-3">
            {codeField("6-digit code")}
            <button type="submit" disabled={busy || code.length !== 6} className={primaryBtn}>
              {busy ? "Verifying…" : "Verify"}
            </button>
          </form>
        </section>
      ) : null}

      {verified.length === 0 ? (
        <section className={card}>
          <h2 className="text-2xl font-semibold tracking-tight">Set up an authenticator app</h2>
          {enrollment ? (
            <div className="mt-5 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <div className="w-fit rounded-2xl bg-white p-3">
                {/* QR code arrives from Supabase as an SVG data URI */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={enrollment.qr} alt="QR code to add this account to your authenticator app" width={176} height={176} />
              </div>
              <div className="space-y-5">
                <p className="text-sm leading-7 text-muted">
                  Scan the QR code with Google Authenticator, 1Password, Authy or similar. Can&apos;t scan? Enter this
                  secret manually:
                </p>
                <code className="block break-all rounded-2xl border border-line bg-inset px-4 py-3 font-mono text-sm text-foreground">
                  {enrollment.secret}
                </code>
                <form onSubmit={confirmEnroll} className="flex flex-wrap items-end gap-3">
                  {codeField("Code from the app")}
                  <button type="submit" disabled={busy || code.length !== 6} className={primaryBtn}>
                    {busy ? "Verifying…" : "Enable"}
                  </button>
                  <button type="button" onClick={cancelEnroll} disabled={busy} className={ghostBtn}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm leading-7 text-muted">
                You will scan a QR code, then confirm with a 6-digit code to finish.
              </p>
              <button type="button" onClick={startEnroll} disabled={busy} className={`${primaryBtn} mt-5`}>
                {busy ? "Starting…" : "Set up authenticator"}
              </button>
            </>
          )}
        </section>
      ) : (
        <section className={card}>
          <h2 className="text-2xl font-semibold tracking-tight">Enrolled authenticators</h2>
          <ul className="mt-5 space-y-3">
            {verified.map((f) => (
              <li
                key={f.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-line bg-inset p-5"
              >
                <div>
                  <p className="font-medium">{f.friendly_name || "Authenticator app"}</p>
                  <p className="mt-1 text-xs text-subtle">Added {new Date(f.created_at).toLocaleDateString()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(f)}
                  disabled={busy || needsStepUp}
                  title={needsStepUp ? "Verify a code first" : undefined}
                  className="rounded-2xl bg-danger-solid px-4 py-2 text-sm font-medium text-white transition hover:bg-danger-solid-hover disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {needsStepUp ? (
            <p className="mt-3 text-xs text-subtle">Verify a code above before removing an authenticator.</p>
          ) : null}
        </section>
      )}
    </div>
  );
}

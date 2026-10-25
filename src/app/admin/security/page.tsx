import Breadcrumbs from "@/components/Breadcrumbs";
import SecurityClient from "./SecurityClient";

// Reads searchParams and the REQUIRE_ADMIN_MFA env var per request, so it must run on the edge runtime.
export const runtime = "edge";

// Only same-site /admin paths are valid post-verification targets (no open redirects).
function safeNext(next: string | undefined) {
  return next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

export default async function SecurityPage({
  searchParams,
}: {
  searchParams: Promise<{ challenge?: string; next?: string }>;
}) {
  const { challenge, next } = await searchParams;

  return (
    <main className="space-y-8">
      <section className="rounded-[2rem] border border-line bg-surface p-6 backdrop-blur-xl shadow-[0_18px_60px_var(--shadow)] md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-subtle">Account security</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Two-factor authentication</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
          Add an authenticator app (TOTP) as a second step after signing in. Enroll first, then set
          REQUIRE_ADMIN_MFA=true to make it mandatory for the admin area.
        </p>
        <Breadcrumbs className="mt-6" items={[{ label: "Admin", href: "/admin" }, { label: "Security" }]} />
      </section>

      <SecurityClient
        challenge={challenge === "1"}
        next={safeNext(next)}
        required={process.env.REQUIRE_ADMIN_MFA === "true"}
      />
    </main>
  );
}

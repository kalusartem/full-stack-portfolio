"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const signIn = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "read:user user:email",
      },
    });

    if (error || !data?.url) {
      window.location.href = "/login?error=oauth";
      return;
    }

    window.location.href = data.url;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-[-8%] h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-8rem] left-[-8%] h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-3xl animate-float-slower" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.10),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 md:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden flex-col justify-center lg:flex">
            <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md">
              Admin Access • Secure Login
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[0.95] tracking-tight">
              Access your
              <span className="block bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                premium admin workspace.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Sign in to manage projects, update portfolio content, and control
              your dashboard.
            </p>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[
                ["Fast edits", "Update projects quickly"],
                ["Secure auth", "Protected admin flow"],
                ["Live control", "Manage portfolio content"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-white/55">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-white/10 via-fuchsia-400/10 to-cyan-400/10 blur-2xl animate-tilt-glow" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  ← Back home
                </Link>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                  Admin Login
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Welcome back
                </h2>
                <p className="mt-2 text-white/60">
                  Continue with GitHub to access the admin area.
                </p>
              </div>

              {error ? (
                <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                  Sign-in failed. Please try again.
                </div>
              ) : null}

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={signIn}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_10px_40px_rgba(255,255,255,0.18)]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.85 10.9.57.1.78-.25.78-.56 0-.27-.01-1.17-.02-2.12-3.19.69-3.87-1.35-3.87-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.27 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.03c.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.03.77 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                  Continue with GitHub
                </button>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
                  Only authorized users can enter the admin dashboard.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

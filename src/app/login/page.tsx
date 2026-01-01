"use client";

import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const signIn = async (provider: "github" | "google") => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: provider === "github" ? "read:user user:email" : undefined,
      },
    });

    if (error || !data?.url) {
      window.location.href = "/login?error=oauth";
      return;
    }

    window.location.href = data.url;
  };

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-gray-600">Use OAuth to access the admin dashboard.</p>

      {error ? (
        <p className="text-sm text-red-600 font-mono">
          Sign-in failed. Please try again.
        </p>
      ) : null}

      <div className="flex gap-3">
        <button
          className="rounded bg-black text-white px-4 py-2"
          type="button"
          onClick={() => signIn("github")}
        >
          Continue with GitHub
        </button>

        <button
          className="rounded px-4 py-2 text-white"
          style={{ background: "grey" }}
          type="button"
          disabled
        >
          Continue with Google (Coming Soon)
        </button>
      </div>
    </main>
  );
}

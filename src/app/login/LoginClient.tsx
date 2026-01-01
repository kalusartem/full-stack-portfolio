"use client";

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
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Sign in</h1>

      {error ? (
        <p className="text-sm text-red-600 font-mono">
          Sign-in failed. Please try again.
        </p>
      ) : null}

      <button
        type="button"
        className="rounded bg-black text-white px-4 py-2"
        onClick={signIn}
      >
        Continue with GitHub
      </button>
    </main>
  );
}

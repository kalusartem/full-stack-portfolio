"use client";

import { supabase } from "@/lib/supabase-browser";

export default function LoginPage() {
  const signIn = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "read:user user:email",
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-gray-600">Use OAuth to access the admin dashboard.</p>

      <div className="flex gap-3">
        <button
          className="rounded bg-black text-white px-4 py-2"
          onClick={() => signIn("github")}
        >
          Continue with GitHub
        </button>

        <button
          className="rounded bg-blue-600 text-white px-4 py-2"
          onClick={() => signIn("google")}
          style={{ background: "grey" }}
          disabled
        >
          Continue with Google (Coming Soon)
        </button>
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

async function signInWithProvider(formData: FormData) {
  "use server";

  const provider = formData.get("provider") as "github" | "google" | null;
  if (!provider) redirect("/login");

  const supabase = await createClient();

  // Server-side OAuth initiation: Supabase returns a URL to redirect the user to.
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      // Route handler that exchanges the code for a session and sets cookies.
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback`,
      scopes: provider === "github" ? "read:user user:email" : undefined,
    },
  });

  if (error || !data?.url) {
    redirect("/login?error=oauth");
  }

  redirect(data.url);
}

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-gray-600">Use OAuth to access the admin dashboard.</p>

      {searchParams?.error ? (
        <p className="text-sm text-red-600 font-mono">
          Sign-in failed. Please try again.
        </p>
      ) : null}

      <div className="flex gap-3">
        <form action={signInWithProvider}>
          <input type="hidden" name="provider" value="github" />
          <button className="rounded bg-black text-white px-4 py-2" type="submit">
            Continue with GitHub
          </button>
        </form>

        <form action={signInWithProvider}>
          <input type="hidden" name="provider" value="google" />
          <button
            className="rounded px-4 py-2 text-white"
            style={{ background: "grey" }}
            type="submit"
            disabled
          >
            Continue with Google (Coming Soon)
          </button>
        </form>
      </div>
    </main>
  );
}

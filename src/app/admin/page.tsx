import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default function AdminPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Admin</h1>

      <div className="mt-6 flex gap-3">
        <Link
          href="/admin/projects"
          className="inline-block rounded bg-gray-900 px-4 py-2 text-white"
        >
          Manage Projects
        </Link>

        <form action={signOut}>
          <button
            className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
            type="submit"
          >
            Log out
          </button>
        </form>
      </div>
    </main>
  );
}

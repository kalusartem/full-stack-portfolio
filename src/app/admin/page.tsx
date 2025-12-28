"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function AdminPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  const logout = async () => {
    setMsg("");
    const { error } = await supabase.auth.signOut();
    if (error) return setMsg(`Logout error: ${error.message}`);
    router.push("/");
    router.refresh();
  };

  return (
    <main className="p-8">
      {msg && <p className="mb-4 text-sm">{msg}</p>}

      <h1 className="text-3xl font-bold">Admin</h1>

      <div className="mt-6 flex gap-3">
        <Link
          href="/admin/projects"
          className="inline-block rounded bg-gray-900 px-4 py-2 text-white"
        >
          Manage Projects
        </Link>

        <button
          className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </main>
  );
}

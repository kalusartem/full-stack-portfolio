"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function AdminPage() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? data.user?.user_metadata?.email ?? "");
    });
  }, []);

  return (
    <main className="p-8 space-y-2">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p className="text-gray-600">Signed in as: {email || "(unknown)"}</p>

      <button
        className="rounded bg-gray-900 text-white px-4 py-2 mt-4"
        onClick={async () => {
          await supabase.auth.signOut();
          location.href = "/";
        }}
      >
        Sign out
      </button>
    </main>
  );
}

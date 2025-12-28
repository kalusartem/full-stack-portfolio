"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Loading…");
  const [msg, setMsg] = useState<string>("");

  const logout = async () => {
    setMsg("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMsg(`Logout error: ${error.message}`);
      return;
    }
    router.push("/"); // or "/login"
    router.refresh(); // ensures server layouts re-check auth
  };

  useEffect(() => {
    debugger;
    const run = async () => {
      debugger;
      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        setStatus(`Session error: ${sessionErr.message}`);
        return;
      }

      if (!sessionData.session) {
        setStatus("No session → redirecting to /login");
        router.replace("/login");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id,email,is_admin")
        .eq("id", userId)
        .maybeSingle(); // ✅ avoids 406

      if (error) {
        setStatus(`Profile query error: ${error.message}`);
        return;
      }

      if (!profile) {
        // Profile row missing (common if created before trigger existed)
        setStatus("No profile row found. Creating one…");

        const { error: insertErr } = await supabase.from("profiles").insert({
          id: userId,
          email: sessionData.session.user.email ?? null,
          is_admin: false,
        });

        if (insertErr) {
          setStatus(`Insert profile failed: ${insertErr.message}`);
          return;
        }

        setStatus("Profile created. Reloading…");
        window.location.reload();
        return;
      }

      if (!profile.is_admin) {
        setStatus("Signed in but not admin → redirecting to /");
        router.replace("/");
        return;
      }

      setStatus(`✅ Admin access granted (${profile.email ?? "no email"})`);
    };

    run();
  }, [router]);

  return (
    <main className="p-8">
      {msg}
      <h1 className="text-3xl font-bold">Admin</h1>
      <p className="mt-3 font-mono text-sm">{status}</p>
      <Link
        href="/admin/projects"
        className="inline-block rounded bg-gray-900 text-white px-4 py-2"
      >
        Manage Projects
      </Link>
      <button
        className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
        onClick={logout}
      >
        Log out
      </button>
    </main>
  );
}

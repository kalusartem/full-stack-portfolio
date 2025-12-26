"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      debugger;
      const { data } = await supabase.auth.getSession();
      alert("Callback session: " + JSON.stringify(data.session));
      console.log("Callback session:", data.session);

      if (!data.session) {
        router.replace("/login");
        return;
      }

      router.replace("/admin");
    };

    run();
  }, [router]);

  return <main className="p-8">Signing you in…</main>;
}

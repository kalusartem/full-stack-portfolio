"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function Home() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Supabase session:", data.session);
    });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <p className="mt-2 text-gray-600">
        Supabase connected (check the browser console)
      </p>
    </main>
  );
}

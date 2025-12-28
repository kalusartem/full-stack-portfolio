// src/lib/supabase-server.ts
import "server-only";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieKV = { name: string; value: string };

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll(): CookieKV[] {
          const storeWithGetAll = cookieStore as unknown as {
            getAll?: () => Array<{ name: string; value: string }>;
          };

          // If getAll exists, use it.
          if (typeof storeWithGetAll.getAll === "function") {
            return storeWithGetAll.getAll().map((c) => ({
              name: c.name,
              value: c.value,
            }));
          }

          // Otherwise: return empty (layout gating won't refresh cookies anyway)
          return [];
        },

        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: CookieOptions;
          }>,
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set({ name, value, ...(options ?? {}) });
            });
          } catch {
            // ignore (Server Components may not allow setting cookies)
          }
        },
      },
    },
  );
}

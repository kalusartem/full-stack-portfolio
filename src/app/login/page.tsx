import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}

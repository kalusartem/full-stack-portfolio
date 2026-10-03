import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-white">
      <p className="text-sm uppercase tracking-[0.25em] text-white/45">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="rounded-2xl bg-white px-6 py-3 font-medium text-black">
        Back home
      </Link>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-foreground">
      <p className="text-sm uppercase tracking-[0.25em] text-subtle">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="rounded-2xl bg-primary px-6 py-3 font-medium text-on-primary">
        Back home
      </Link>
    </main>
  );
}

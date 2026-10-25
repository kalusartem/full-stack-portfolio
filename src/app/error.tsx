"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-foreground">
      <h1 className="text-4xl font-semibold tracking-tight">Something went wrong</h1>
      <button onClick={reset} className="rounded-2xl bg-primary px-6 py-3 font-medium text-on-primary">
        Try again
      </button>
    </main>
  );
}

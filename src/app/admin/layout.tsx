import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Overview", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Security", href: "/admin/security" },
  { label: "Portfolio", href: "/" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[-8rem] h-80 w-80 rounded-full bg-blob-a blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-blob-b blur-3xl" />
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 md:px-10">
        <header className="mb-8 rounded-[2rem] border border-line bg-surface px-5 py-4 backdrop-blur-xl shadow-[0_10px_50px_var(--shadow)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-subtle">Portfolio CMS</p>
              <Link href="/admin" className="mt-2 inline-block text-2xl font-semibold tracking-tight">
                Admin Console
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-line bg-surface px-4 py-2 text-sm text-soft transition hover:border-line-hover hover:bg-surface-strong hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
              <a
                href="/auth/signout"
                className="rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-on-primary transition hover:scale-[1.02]"
              >
                Sign out
              </a>
            </div>
          </div>
        </header>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

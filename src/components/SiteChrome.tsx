"use client";

import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { handleOf } from "@/components/ui";
import { site } from "@/lib/site";

export type Social = {
  label: string;
  href: string;
  handle: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

export const socials = [
  site.github && { label: "GitHub", href: site.github, handle: handleOf(site.github), Icon: GitHubIcon },
  site.linkedin && { label: "LinkedIn", href: site.linkedin, handle: handleOf(site.linkedin), Icon: LinkedInIcon },
].filter(Boolean) as Social[];

const navLinks = [
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function SocialButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} (opens in new tab)`}
          title={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-soft transition hover:bg-surface-strong hover:text-foreground"
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}

// Page shell shared by the home and projects pages. On the home page, nav links are in-page anchors;
// elsewhere they point back to the matching home page section.
export function SiteShell({ onHome, children }: { onHome: boolean; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navHref = (hash: string) => (onHome ? hash : `/${hash}`);
  const links = navLinks.map(([label, hash]) => [label, label === "Work" && !onHome ? "/projects" : navHref(hash)]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary selection:text-on-primary">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] hidden h-[30rem] w-[30rem] rounded-full bg-blob-a blur-3xl animate-float-slow md:block" />
        <div className="absolute top-[40rem] left-[-6rem] hidden h-[28rem] w-[28rem] rounded-full bg-blob-b blur-3xl animate-float-slower md:block" />
        <div className="absolute inset-0 bg-aurora" />
        <div className="absolute inset-x-0 top-0 h-[60rem] bg-grid opacity-[0.08]" />
      </div>

      <header className="sticky top-0 z-30 px-4 pt-4 md:px-10">
        <nav
          aria-label="Primary"
          className="mx-auto max-w-6xl animate-fade-in-down rounded-2xl border border-line bg-nav px-4 py-2.5 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-4">
            <Link href={onHome ? "#top" : "/"} className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-mono text-xs text-on-primary">
                AK
              </span>
              <span className="hidden sm:inline">{site.name}</span>
            </Link>

            <div className="hidden items-center gap-7 text-sm text-soft md:flex">
              {links.map(([label, href]) => (
                <Link key={label} href={href} className="transition hover:text-foreground">
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SocialButtons className="hidden sm:flex" />
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-soft md:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                </svg>
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div id="mobile-menu" className="mt-2 flex flex-col gap-1 border-t border-line pt-2 md:hidden">
              {links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2 text-soft hover:bg-surface hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-soft hover:bg-surface hover:text-foreground sm:hidden"
                >
                  <Icon size={17} /> {label}
                </a>
              ))}
            </div>
          ) : null}
        </nav>
      </header>

      <main id="main" className="relative z-10">
        {children}
      </main>

      <footer className="relative z-10 border-t border-line px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-subtle">
          <p>
            © {new Date().getFullYear()} {site.name} · Built with Next.js &amp; Supabase
          </p>
          <SocialButtons />
        </div>
      </footer>
    </div>
  );
}

// Shared Tailwind class strings for the public pages.
export const eyebrow = "font-mono text-xs uppercase tracking-[0.2em] text-accent";
export const h2 = "mt-3 text-3xl font-semibold tracking-tight text-balance md:text-5xl";
export const chip = "rounded-full border border-line bg-surface px-3 py-1 text-xs text-soft";
export const btnPrimary =
  "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-on-primary shadow-[0_10px_40px_var(--primary-glow)] transition duration-300 hover:-translate-y-0.5";
export const btnSecondary =
  "inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface px-5 py-3 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-surface-strong";

// "https://www.linkedin.com/in/name/" -> "linkedin.com/in/name"
export const handleOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

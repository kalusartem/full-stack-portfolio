"use client";

import { useSyncExternalStore } from "react";

import { themeColors } from "@/lib/theme";

// Same contract as the inline script in layout.tsx: localStorage "theme" = light | dark | system (absent = system).
type Pref = "light" | "dark" | "system";

const order: Pref[] = ["system", "light", "dark"];
const labels: Record<Pref, string> = { system: "System", light: "Light", dark: "Dark" };
const EVENT = "themechange";

function readPref(): Pref {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function applyPref(pref: Pref) {
  const resolved =
    pref === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : pref;
  document.documentElement.setAttribute("data-theme", resolved);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", themeColors[resolved]));
}

function Icon({ pref }: { pref: Pref }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (pref === "light") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (pref === "dark") {
    return (
      <svg {...props}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const pref = useSyncExternalStore(subscribe, readPref, () => "system" as Pref);
  const next = order[(order.indexOf(pref) + 1) % order.length];

  const cycle = () => {
    try {
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      // storage blocked: the choice still applies for this page view
    }
    applyPref(next);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${labels[pref]}. Switch to ${labels[next]}.`}
      title={`Theme: ${labels[pref]}`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-soft transition hover:bg-surface-strong hover:text-foreground ${className}`}
    >
      <Icon pref={pref} />
    </button>
  );
}

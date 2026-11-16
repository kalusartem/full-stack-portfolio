import type { ReactNode } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteShell } from "@/components/SiteChrome";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-soft [&_a]:text-foreground [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <SiteShell onHome={false}>
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-12 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-subtle">Last updated: {updated}</p>
        {children}
      </article>
    </SiteShell>
  );
}

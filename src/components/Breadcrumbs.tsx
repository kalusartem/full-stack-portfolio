import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string; // omit for the current/last crumb
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2"
            >
              {idx > 0 && <span className="text-gray-400">/</span>}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-gray-900 font-medium" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import Link from "next/link";
import type { Route } from "next";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href as Route} className="transition hover:text-foreground">
                {item.title}
              </Link>
            ) : (
              <span className="text-foreground">{item.title}</span>
            )}

            {index < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
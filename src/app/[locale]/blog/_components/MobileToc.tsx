import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { cn } from "@/components/lib/utils";
import type { TocEntry } from "@/lib/blog";

/** Collapsible "On this page" for narrow screens (the desktop rail replaces the sidebar instead). */
export default function MobileToc({ headings, label }: { headings: TocEntry[]; label: string }) {
  if (headings.length === 0) return null;

  return (
    <details className="group rounded-lg border border-neutral-300 lg:hidden dark:border-neutral-700">
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        {label}
        <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <ul className="flex flex-col gap-0.5 border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
        {headings.map(heading => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                "block py-1 text-sm transition-colors hover:text-foreground",
                heading.level === 3 ? "pl-4 text-neutral-500 dark:text-neutral-400" : "font-medium text-neutral-700 dark:text-neutral-300"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

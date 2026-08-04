"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "@/i18n/navigation";
import { cn } from "@/components/lib/utils";
import type { TocEntry } from "@/lib/blog";
import ThemeChanger from "../../_components/ThemeChanger";
import LanguageChanger from "../../_components/LanguageChanger";

interface Labels {
  portfolio: string;
  logoAlt: string;
  back: string;
  onThisPage: string;
}

export default function BlogTocRail({ headings, labels }: { headings: TocEntry[]; labels: Labels }) {
  const [activeSlug, setActiveSlug] = useState<string>(headings[0]?.slug ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map(heading => document.getElementById(heading.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Highlight the first heading (in document order) currently in the activation band.
        const current = headings.find(heading => visible.has(heading.slug));
        if (current) setActiveSlug(current.slug);
      },
      { rootMargin: "-80px 0px -66% 0px" }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const handleJump = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    event.preventDefault();
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${slug}`);
    setActiveSlug(slug);
  };

  return (
    <nav className="hidden w-48 flex-col justify-between gap-10 overflow-y-auto border-r border-neutral-300 p-4 lg:flex dark:border-neutral-800">
      <div className="flex flex-col gap-4 pt-8">
        <Link href="/" className="-ml-2 flex cursor-pointer flex-row items-center gap-1 transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt={labels.logoAlt} className="size-8 md:size-12" width={32} height={32} />
          <span className="font-mono text-lg">{labels.portfolio}</span>
        </Link>

        <Link
          href="/blog"
          className="-ml-2 flex flex-row items-center gap-2 rounded-md p-2 text-sm text-neutral-600 transition-colors hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <ArrowLeftIcon className="size-4" />
          <span>{labels.back}</span>
        </Link>

        {headings.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-bold text-neutral-600 uppercase dark:text-neutral-400">{labels.onThisPage}</p>
            <ul className="mt-3 flex flex-col border-l border-neutral-300 dark:border-neutral-800">
              {headings.map(heading => {
                const isActive = heading.slug === activeSlug;
                return (
                  <li key={heading.slug} className="-ml-px">
                    <a
                      href={`#${heading.slug}`}
                      onClick={event => handleJump(event, heading.slug)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "block border-l-2 py-1 pl-3 text-sm text-pretty transition-colors",
                        isActive
                          ? "border-grad-1 font-medium text-grad-1"
                          : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                      )}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between gap-2">
        <ThemeChanger />
        <LanguageChanger />
      </div>
    </nav>
  );
}

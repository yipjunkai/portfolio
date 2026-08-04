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

/** Nearest scrollable ancestor of the content (the <main> scroll container), else the window. */
function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const overflowY = getComputedStyle(node).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return node;
    node = node.parentElement;
  }
  return window;
}

/** Group the flat heading list into H2 sections each holding their following H3s. */
function groupHeadings(headings: TocEntry[]) {
  const groups: { heading: TocEntry; children: TocEntry[] }[] = [];
  for (const heading of headings) {
    if (heading.level === 2 || groups.length === 0) {
      groups.push({ heading, children: [] });
    } else {
      groups[groups.length - 1].children.push(heading);
    }
  }
  return groups;
}

export default function BlogTocRail({ headings, labels }: { headings: TocEntry[]; labels: Labels }) {
  const [activeSlug, setActiveSlug] = useState<string>(headings[0]?.slug ?? "");
  const groups = groupHeadings(headings);

  useEffect(() => {
    const items = headings
      .map(heading => ({ slug: heading.slug, el: document.getElementById(heading.slug) }))
      .filter((item): item is { slug: string; el: HTMLElement } => item.el !== null);
    if (items.length === 0) return;

    const scroller = getScrollParent(items[0].el);
    const ACTIVATION_LINE = 120; // px below the viewport top where a heading becomes "current"

    const isWindowScroller = scroller === window;
    const atBottom = () => {
      if (isWindowScroller) {
        return Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
      }
      const node = scroller as HTMLElement;
      return Math.ceil(node.scrollTop + node.clientHeight) >= node.scrollHeight - 2;
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      // At the bottom, the last sections can't reach the activation line — force the last one active.
      if (atBottom()) {
        setActiveSlug(items[items.length - 1].slug);
        return;
      }
      // Otherwise the active heading is the last one whose top has scrolled above the activation line.
      let current = items[0].slug;
      for (const { slug, el } of items) {
        if (el.getBoundingClientRect().top - ACTIVATION_LINE <= 0) current = slug;
        else break;
      }
      setActiveSlug(current);
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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

        {groups.length > 0 && (
          <div className="mt-2">
            <p className="text-xs font-bold text-neutral-600 uppercase dark:text-neutral-400">{labels.onThisPage}</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {groups.map(group => {
                const isSectionActive = group.heading.slug === activeSlug;
                return (
                  <li key={group.heading.slug}>
                    <a
                      href={`#${group.heading.slug}`}
                      onClick={event => handleJump(event, group.heading.slug)}
                      aria-current={isSectionActive ? "location" : undefined}
                      className={cn(
                        "block text-sm text-pretty transition-colors",
                        isSectionActive
                          ? "font-semibold text-grad-1"
                          : "font-medium text-neutral-700 hover:text-grad-1 dark:text-neutral-200"
                      )}
                    >
                      {group.heading.text}
                    </a>

                    {group.children.length > 0 && (
                      <ul className="mt-1 flex flex-col border-l border-neutral-300 dark:border-neutral-800">
                        {group.children.map(child => {
                          const isActive = child.slug === activeSlug;
                          return (
                            <li key={child.slug} className="-ml-px">
                              <a
                                href={`#${child.slug}`}
                                onClick={event => handleJump(event, child.slug)}
                                aria-current={isActive ? "location" : undefined}
                                className={cn(
                                  "block border-l-2 py-0.5 pl-3 text-sm text-pretty transition-colors",
                                  isActive
                                    ? "border-grad-1 font-medium text-grad-1"
                                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                                )}
                              >
                                {child.text}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
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

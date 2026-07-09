"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { capture } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Measures how far readers get through the copy on each page and how long they
 * actively spend, then reports it to PostHog. Pairs with Google Search Console:
 * GSC shows how people *find* a page, these events show whether the copy is
 * *consumed* once they land.
 *
 * Renders nothing. Mounted inside <main>, which is the scroll container on this
 * site (not the window), so depth is measured against main's scroll position.
 */
export default function ContentEngagementTracker() {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const scroller = document.querySelector("main");
    if (!scroller) return;

    const fired = new Set<number>();
    let maxDepth = 0;
    let activeMs = 0;
    let lastResumeAt: number | null = document.visibilityState === "visible" ? performance.now() : null;
    let flushed = false;
    let rafScheduled = false;
    let rafId = 0;

    const measure = () => {
      const scrollable = scroller.scrollHeight - scroller.clientHeight;
      if (scrollable <= 0) {
        // Whole page fits the viewport — everything is visible without scrolling.
        maxDepth = 100;
        if (!fired.has(100)) {
          MILESTONES.forEach(milestone => fired.add(milestone));
          capture("content_scroll_depth", { depth: 100, pathname, locale });
        }
        return;
      }
      const depth = Math.min(100, Math.round((scroller.scrollTop / scrollable) * 100));
      if (depth > maxDepth) maxDepth = depth;
      for (const milestone of MILESTONES) {
        if (maxDepth >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          capture("content_scroll_depth", { depth: milestone, pathname, locale });
        }
      }
    };

    const onScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      rafId = requestAnimationFrame(() => {
        rafScheduled = false;
        measure();
      });
    };

    // Only count time the tab is actually focused, not time parked in a background tab.
    const pauseTimer = () => {
      if (lastResumeAt != null) {
        activeMs += performance.now() - lastResumeAt;
        lastResumeAt = null;
      }
    };
    const resumeTimer = () => {
      if (lastResumeAt == null) lastResumeAt = performance.now();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") resumeTimer();
      else pauseTimer();
    };

    const flush = () => {
      if (flushed) return;
      flushed = true;
      pauseTimer();
      capture("content_engagement", {
        pathname,
        locale,
        active_seconds: Math.round(activeMs / 1000),
        max_scroll_depth: maxDepth,
        reached_bottom: maxDepth >= 90
      });
    };

    // Defer the first measure a frame so main has settled to its final height.
    rafId = requestAnimationFrame(measure);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      cancelAnimationFrame(rafId);
      scroller.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush(); // fire on SPA navigation away from this page
    };
  }, [pathname, locale]);

  return null;
}

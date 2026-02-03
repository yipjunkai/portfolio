"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mainRef.current) {
      mainRef.current = document.querySelector("main");
    }
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

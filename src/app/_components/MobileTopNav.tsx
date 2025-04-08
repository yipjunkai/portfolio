"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import favicon from "../favicon.ico";

export default function MobileTopNav(props: {
  sections: {
    name: string;
    routes: {
      name: string;
      href: string;
      icon: JSX.Element;
    }[];
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const flatRoutes = props.sections.flatMap((section) => section.routes);

  return (
    <div className="relative">
      <nav className="w-full p-4 pl-6 flex flex-row lg:hidden justify-between items-center">
        <Image src={favicon} alt="logo" width={28} height={28} />

        <div className="flex flex-row gap-2 *:p-2">
          {/* Search button */}
          <button>
            <MagnifyingGlassIcon className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div className="w-10"></div>
        </div>
      </nav>
      {/* Menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 group flex h-10 w-10 md:h-12 md:w-12 cursor-pointer items-center justify-center z-50 lg:hidden"
      >
        <div className="space-y-2">
          <span
            className={`block h-1 w-6 md:w-8 origin-center rounded-full bg-neutral-500 transition-transform ease-in-out ${isOpen ? "translate-y-1.5 rotate-45" : ""}`}
          ></span>
          <span
            className={`block h-1 w-4 md:w-6 origin-center rounded-full bg-gradient-to-r from-grad-1 to-grad-2 transition-transform ease-in-out ${isOpen ? "w-6 md:w-8 -translate-y-1.5 -rotate-45" : ""}`}
          ></span>
        </div>
      </button>
      <div
        className={`lg:hidden z-40 absolute top-0 left-0 w-full h-screen bg-background text-foreground transition-all duration-500 overflow-y-auto ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.1, 0.6, 1.0)",
        }}
      >
        <div className="flex flex-col gap-6 md:gap-8 p-4">
          {flatRoutes.map((route, index) => (
            <Link
              onClick={() => setIsOpen(false)}
              href={route.href}
              key={route.name}
              className={`capitalize text-4xl md:text-5xl first:mt-16 pl-8 last:mb-48 duration-150 ease-in transition-all ${
                isOpen ? "opacity-100" : "opacity-0 !delay-0"
              }`}
              style={{
                transitionDelay: `${index * 0.1 + 0.4}s`,
              }}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

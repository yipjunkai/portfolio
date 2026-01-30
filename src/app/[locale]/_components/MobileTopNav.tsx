"use client";

import Image from "next/image";
import { JSX, useState } from "react";
import ThemeChanger from "./ThemeChanger";
import { Link } from "@/i18n/navigation";
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
      <nav className="w-full p-4 pl-6 flex flex-row lg:hidden justify-between items-center bg-gray-50 dark:bg-[#131313] border-b border-neutral-300 dark:border-neutral-800">
        {/* SVG: favicon */}
        <Image
          src="/logo.svg"
          alt="logo"
          className="size-8 md:size-12"
          width={32}
          height={32}
        />

        <div className="flex flex-row gap-2 *:p-2">
          {/* Search button */}
          {/* <button>
            <MagnifyingGlassIcon className="size-6 md:size-8" />
          </button> */}

          <div className="size-10 md:size-12"></div>
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
        className={`lg:hidden z-40 absolute top-0 left-0 w-full h-screen bg-background transition-all duration-500 overflow-y-auto ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } flex flex-col gap-6 md:gap-8 pt-16 pb-48 *:ml-12`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.1, 0.6, 1.0)",
        }}
      >
        {flatRoutes.map((route, index) => (
          <Link
            onClick={() => setIsOpen(false)}
            href={route.href}
            key={route.name}
            className={`capitalize text-4xl md:text-5xl duration-150 ease-in transition-all ${
              isOpen ? "opacity-100" : "opacity-0 delay-0!"
            }`}
            style={{
              transitionDelay: `${index * 0.1 + 0.4}s`,
            }}
          >
            {route.name}
          </Link>
        ))}
        <ThemeChanger
          className={`mt-24 duration-150 ease-in transition-all ${
            isOpen ? "opacity-100" : "opacity-0 delay-0!"
          }`}
          style={{
            transitionDelay: `${flatRoutes.length * 0.1 + 0.4}s`,
          }}
        />
      </div>
    </div>
  );
}

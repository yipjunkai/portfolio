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

  const flatRoutes = props.sections.flatMap(section => section.routes);

  return (
    <div className="relative">
      <nav className="flex w-full flex-row items-center justify-between border-b border-neutral-300 bg-gray-50 p-4 pl-6 lg:hidden dark:border-neutral-800 dark:bg-[#131313]">
        {/* SVG: favicon */}
        <Image src="/logo.svg" alt="logo" className="size-8 md:size-12" width={32} height={32} />

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
        className="group absolute top-4 right-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center md:h-12 md:w-12 lg:hidden"
      >
        <div className="space-y-2">
          <span
            className={`block h-1 w-6 origin-center rounded-full bg-neutral-500 transition-transform ease-in-out md:w-8 ${isOpen ? "translate-y-1.5 rotate-45" : ""}`}
          ></span>
          <span
            className={`block h-1 w-4 origin-center rounded-full bg-linear-to-r from-grad-1 to-grad-2 transition-transform ease-in-out md:w-6 ${isOpen ? "w-6 -translate-y-1.5 -rotate-45 md:w-8" : ""}`}
          ></span>
        </div>
      </button>
      <div
        className={`absolute top-0 left-0 z-40 h-screen w-full overflow-y-auto bg-background transition-all duration-500 lg:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } flex flex-col gap-6 pt-16 pb-48 *:ml-12 md:gap-8`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.1, 0.6, 1.0)"
        }}
      >
        {flatRoutes.map((route, index) => (
          <Link
            onClick={() => setIsOpen(false)}
            href={route.href}
            key={route.name}
            className={`text-4xl capitalize transition-all duration-150 ease-in md:text-5xl ${
              isOpen ? "opacity-100" : "opacity-0 delay-0!"
            }`}
            style={{
              transitionDelay: `${index * 0.1 + 0.4}s`
            }}
          >
            {route.name}
          </Link>
        ))}
        <ThemeChanger
          className={`mt-24 transition-all duration-150 ease-in ${isOpen ? "opacity-100" : "opacity-0 delay-0!"}`}
          style={{
            transitionDelay: `${flatRoutes.length * 0.1 + 0.4}s`
          }}
        />
      </div>
    </div>
  );
}

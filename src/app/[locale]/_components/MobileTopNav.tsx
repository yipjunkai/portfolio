"use client";

import Image from "next/image";
import { useState } from "react";
import ThemeChanger from "./ThemeChanger";
import { Link } from "@/i18n/navigation";
import LanguageChanger from "./LanguageChanger";
import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Sections } from "../layout";
import type { Pathname } from "@/i18n/routing";

export default function MobileTopNav(props: { sections: Sections[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  const flatRoutes = props.sections.flatMap(section => section.routes);

  return (
    <div className="relative">
      <nav className="flex w-full flex-row items-center justify-between border-b border-neutral-300 bg-gray-50 p-4 pl-6 lg:hidden dark:border-neutral-800 dark:bg-[#131313]">
        {/* SVG: favicon */}
        <Link href="/" className="cursor-pointer transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt={t("logoAlt")} className="size-8 md:size-12" width={32} height={32} />
        </Link>

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
        className={`absolute top-0 left-0 z-40 h-svh w-full overflow-y-auto bg-background transition-all duration-500 lg:hidden ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } flex flex-col gap-6 py-16 *:mx-12 md:gap-8`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.4, 0.1, 0.6, 1.0)"
        }}
      >
        {flatRoutes.map((route, index) => {
          const className = `flex flex-row items-center justify-between text-4xl capitalize transition-all duration-150 ease-in md:text-5xl ${
            isOpen ? "opacity-100" : "opacity-0 delay-0!"
          }`;
          const style = { transitionDelay: `${index * 0.1 + 0.4}s` };
          const children = (
            <>
              <span>{route.name}</span>
              {route.external && <ExternalLinkIcon className="size-6" />}
            </>
          );

          return route.external ? (
            <a key={route.name} href={route.href} onClick={() => setIsOpen(false)} className={className} style={style} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ) : (
            <Link key={route.name} href={route.href as Pathname} onClick={() => setIsOpen(false)} className={className} style={style}>
              {children}
            </Link>
          );
        })}
        <div className="mt-auto flex flex-row items-center justify-between">
          <ThemeChanger
            className={`transition-all duration-150 ease-in ${isOpen ? "opacity-100" : "opacity-0 delay-0!"}`}
            style={{
              transitionDelay: `${flatRoutes.length * 0.1 + 0.4}s`
            }}
          />
          <LanguageChanger
            className={`transition-all duration-150 ease-in ${isOpen ? "opacity-100" : "opacity-0 delay-0!"}`}
            style={{
              transitionDelay: `${flatRoutes.length * 0.1 + 0.4}s`
            }}
          />
        </div>
      </div>
    </div>
  );
}

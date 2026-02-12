"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ThemeChanger from "./ThemeChanger";
import LanguageChanger from "./LanguageChanger";
import { ExternalLinkIcon } from "lucide-react";
import type { Sections } from "../layout";
import type { Pathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Sidebar(props: { sections: Sections[] }) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className="hidden w-48 flex-col justify-between gap-20 overflow-y-auto border-r border-neutral-300 p-4 lg:flex dark:border-neutral-800">
      <div className="flex flex-col gap-4 pt-8">
        {/* <input
          type="text"
          placeholder="Search"
          className="rounded-md bg-neutral-300 dark:bg-neutral-800 py-1.5 px-4 w-[calc(100%+0.5rem)] -ml-2 outline-1 outline-neutral-400 dark:outline-neutral-800"
        /> */}
        {/* SVG: favicon */}
        <Link href="/" className="-ml-2 flex cursor-pointer flex-row items-center gap-1 transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt={t("logoAlt")} className="size-8 md:size-12" width={32} height={32} />
          <span className="font-mono text-lg">{t("portfolio")}</span>
        </Link>
        {props.sections.map(section => (
          <div key={section.name} className="not-first:mt-4">
            <h2 className="text-xs font-bold text-neutral-600 uppercase dark:text-neutral-400">{section.name}</h2>
            <div className="flex flex-col gap-2 py-2">
              {section.routes.map(route => {
                const className = `group -ml-2 flex flex-row items-center justify-start gap-4 rounded-md p-2 capitalize transition-all duration-200 *:transition-all *:duration-200 hover:bg-gray-300 dark:hover:bg-neutral-800 ${
                  !route.external && pathname === route.href ? "bg-gray-300 dark:bg-neutral-800" : ""
                }`;
                const children = (
                  <>
                    {route.icon}
                    <span className="text-neutral-800 dark:text-neutral-200 dark:group-hover:text-white">{route.name}</span>
                    {route.external && <ExternalLinkIcon className="ml-auto size-4" />}
                  </>
                );

                return route.external ? (
                  <a key={route.name} href={route.href} className={className} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ) : (
                  <Link key={route.name} href={route.href as Pathname} className={className}>
                    {children}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between gap-2">
        <ThemeChanger />
        <LanguageChanger />
      </div>
    </nav>
  );
}

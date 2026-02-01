"use client";

import { JSX } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ThemeChanger from "./ThemeChanger";

export default function Sidebar(props: {
  sections: {
    name: string;
    routes: {
      name: string;
      href: string;
      icon: JSX.Element;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="hidden w-48 flex-col justify-between gap-20 overflow-y-auto border-r border-neutral-300 p-4 lg:flex dark:border-neutral-800">
      <div className="flex flex-col gap-4 pt-8">
        {/* <input
            type="text"
            placeholder="Search"
            className="rounded-md bg-neutral-300 dark:bg-neutral-800 py-1.5 px-4 w-[calc(100%+0.5rem)] -ml-2 outline-1 outline-neutral-400 dark:outline-neutral-800"
          /> */}
        {/* SVG: favicon */}
        <div className="-ml-2 flex flex-row items-center gap-1">
          <Image src="/logo.svg" alt="logo" className="size-8 md:size-12" width={32} height={32} />
          <span className="font-mono text-lg">Portfolio</span>
        </div>
        {props.sections.map(section => (
          <div key={section.name} className="not-first:mt-4">
            <h2 className="text-xs font-bold text-neutral-600 uppercase dark:text-neutral-400">{section.name}</h2>
            <div className="flex flex-col gap-2 py-2">
              {section.routes.map(route => (
                <Link
                  href={route.href}
                  key={route.name}
                  className={`group -ml-2 flex flex-row items-center justify-start gap-4 rounded-md p-2 capitalize transition-all duration-200 *:transition-all *:duration-200 hover:bg-gray-300 dark:hover:bg-neutral-800 ${
                    pathname === route.href ? "bg-gray-300 dark:bg-neutral-800" : ""
                  }`}
                  target={route.href.includes("http") ? "_blank" : "_self"}
                >
                  {route.icon}
                  <span className="text-neutral-800 dark:text-neutral-200 dark:group-hover:text-white">{route.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ThemeChanger />
    </nav>
  );
}

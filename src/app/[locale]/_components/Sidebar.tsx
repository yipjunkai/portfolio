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
    <nav className="w-48 p-4 hidden lg:flex flex-col border-r border-neutral-300 dark:border-neutral-800 overflow-y-auto justify-between gap-20">
      <div className="flex flex-col gap-4 pt-8">
        {/* <input
            type="text"
            placeholder="Search"
            className="rounded-md bg-neutral-300 dark:bg-neutral-800 py-1.5 px-4 w-[calc(100%+0.5rem)] -ml-2 outline-1 outline-neutral-400 dark:outline-neutral-800"
          /> */}
        {/* SVG: favicon */}
        <div className="flex flex-row gap-1 items-center -ml-2">
          <Image
            src="/logo.svg"
            alt="logo"
            className="size-8 md:size-12"
            width={32}
            height={32}
          />
          <span className="font-mono text-lg">Portfolio</span>
        </div>
        {props.sections.map((section) => (
          <div key={section.name} className="not-first:mt-4">
            <h2 className="text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
              {section.name}
            </h2>
            <div className="flex flex-col gap-2 py-2">
              {section.routes.map((route) => (
                <Link
                  href={route.href}
                  key={route.name}
                  className={`hover:bg-gray-300 dark:hover:bg-neutral-800 p-2 -ml-2 rounded-md capitalize flex flex-row gap-4 justify-start items-center group transition-all *:transition-all duration-200 *:duration-200 ${
                    pathname === route.href
                      ? "bg-gray-300 dark:bg-neutral-800"
                      : ""
                  }`}
                  target={route.href.includes("http") ? "_blank" : "_self"}
                >
                  {route.icon}
                  <span className="text-neutral-800 dark:group-hover:text-white dark:text-neutral-200">
                    {route.name}
                  </span>
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

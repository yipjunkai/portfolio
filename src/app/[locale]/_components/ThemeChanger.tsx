"use client";

import { cn } from "@/components/lib/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { HTMLAttributes, useEffect, useState } from "react";

export default function ThemeChanger({ className, style }: HTMLAttributes<HTMLDivElement>) {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttons = [
    {
      theme: "dark",
      icon: <MoonIcon className="size-8 md:size-7 lg:size-5" />
    },
    {
      theme: "light",
      icon: <SunIcon className="size-8 md:size-7 lg:size-5" />
    }
  ];

  return (
    <div
      className={cn(
        "flex w-min items-center gap-2 rounded-full bg-linear-to-r from-grad-1 to-grad-2 p-1 text-neutral-200 lg:gap-1 relative",
        className
      )}
      style={style}
    >
      {buttons.map(button => (
        <button
          key={button.theme}
          onClick={() => setTheme(button.theme)}
          className={`z-20 rounded-full p-1 ${resolvedTheme === button.theme ? "text-purple-600" : ""}`}
          aria-label={`Button to change theme to ${button.theme}`}
        >
          {button.icon}
        </button>
      ))}

      <div
        className={`absolute size-9 transform rounded-full bg-white transition-transform! duration-300 md:size-8 lg:size-6 ${
          resolvedTheme === "dark" ? "translate-x-0.5" : "translate-x-12.5 md:translate-x-11.5 lg:translate-x-8.5"
        }`}
      />
    </div>
  );
}

"use client";

import { cn } from "@/components/lib/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { HTMLAttributes, useEffect, useState } from "react";

export default function ThemeChanger({ className, style }: HTMLAttributes<HTMLDivElement>) {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay to allow browser to paint initial state before transitioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);

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
        "flex w-min items-center gap-2 rounded-full bg-linear-to-r from-grad-1 to-grad-2 p-1 text-neutral-200 lg:gap-1 relative overflow-visible before:absolute before:-inset-1 before:z-0 before:animate-[gradient-rotate_2s_ease-in-out_infinite] before:rounded-full before:bg-[linear-gradient(to_right,var(--color-grad-1),var(--color-grad-1),var(--color-grad-3),var(--color-grad-3),var(--color-grad-1),var(--color-grad-1),var(--color-grad-3),var(--color-grad-3),var(--color-grad-1))] before:bg-size-[200%_100%] before:opacity-80 before:blur-md before:content-[''] motion-reduce:before:animate-none lg:before:animate-none lg:before:opacity-0",
        className
      )}
      style={style}
    >
      {buttons.map(button => (
        <button
          key={button.theme}
          onClick={() => setTheme(button.theme)}
          className={`z-20 rounded-full p-1 transition-colors duration-300 ${mounted && resolvedTheme === button.theme ? "text-purple-600" : ""}`}
          aria-label={`Button to change theme to ${button.theme}`}
        >
          {button.icon}
        </button>
      ))}

      <div
        className={cn(
          "absolute size-9 rounded-full bg-white transition-all duration-300 md:size-8 lg:size-6",
          mounted ? "opacity-100" : "opacity-0",
          !mounted || resolvedTheme === "dark" ? "translate-x-0.5" : "translate-x-12.5 md:translate-x-11.5 lg:translate-x-8.5"
        )}
      />
    </div>
  );
}

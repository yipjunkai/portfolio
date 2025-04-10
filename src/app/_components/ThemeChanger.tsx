"use client";

import { CogIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeChanger({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttons = [
    {
      theme: "system",
      icon: <CogIcon className="size-8 md:size-7 lg:size-5" />,
    },
    {
      theme: "dark",
      icon: <MoonIcon className="size-8 md:size-7 lg:size-5" />,
    },
    {
      theme: "light",
      icon: <SunIcon className="size-8 md:size-7 lg:size-5" />,
    },
  ];

  return (
    <div
      className={`rounded-full bg-gradient-to-r from-grad-1 to-grad-2 p-1 flex items-center gap-2 lg:gap-1 w-min text-neutral-200 ${className} relative`}
      style={style}
    >
      {buttons.map((button) => (
        <button
          key={button.theme}
          onClick={() => setTheme(button.theme)}
          className={`z-20 p-1 rounded-full ${theme === button.theme ? "text-purple-600" : ""}`}
        >
          {button.icon}
        </button>
      ))}

      <div
        className={`absolute rounded-full size-9 md:size-8 lg:size-6 !transition-transform transform duration-300 bg-white ${
          theme === "system"
            ? "translate-x-0.5"
            : theme === "dark"
              ? "translate-x-12.5 md:translate-x-11.5 lg:translate-x-8.5"
              : "translate-x-24.5 md:translate-x-22.5 lg:translate-x-16.5"
        }`}
      />
    </div>
  );
}

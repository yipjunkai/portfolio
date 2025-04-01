import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import MobileTopNav from "@/components/nav/MobileTopNav";
import {
  BriefcaseIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { JSX } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yip Jun Kai",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections: {
    name: string;
    routes: {
      name: string;
      href: string;
      icon: JSX.Element;
    }[];
  }[] = [
    {
      name: "About Me",
      routes: [
        {
          name: "home",
          href: "/",
          icon: <HomeIcon className="w-4 h-4" />,
        },
        {
          name: "experience",
          href: "/experience",
          icon: <BriefcaseIcon className="w-4 h-4" />,
        },
        {
          name: "projects",
          href: "/projects",
          icon: <CodeBracketIcon className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Connect",
      routes: [
        {
          name: "Email",
          href: "mailto:junkai@gmail.com",
          icon: <EnvelopeIcon className="w-4 h-4" />,
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/yipjk/",
          icon: <LinkedinIcon className="w-4 h-4" />,
        },
        {
          name: "Github",
          href: "https://github.com/yipjunkai",
          icon: <GithubIcon className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden lg:block absolute left-1/2 w-1/2 h-full bg-neutral-900 z-0"></div>
        <div
          className="absolute left-1/2 -translate-x-1/2
         flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto z-10 *:lg:h-full"
        >
          <Sidebar sections={sections} />
          <MobileTopNav sections={sections} />
          <main className="grow bg-neutral-900 *:w-full *:max-w-[900px] *:mx-auto *:p-4 *:lg:p-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

const Sidebar = (props: {
  sections: {
    name: string;
    routes: {
      name: string;
      href: string;
      icon: JSX.Element;
    }[];
  }[];
}) => {
  return (
    <nav className="w-48 p-4 hidden lg:flex flex-col">
      <input
        type="text"
        placeholder="Search"
        className="rounded-md bg-neutral-800 py-1.5 px-4 w-[calc(100%+0.5rem)] -ml-2"
      />
      <div className="flex flex-col gap-2 mt-4">
        {props.sections.map((section) => (
          <div key={section.name} className="not-first:mt-4">
            <h2 className="text-xs font-bold uppercase text-neutral-600">
              {section.name}
            </h2>
            <div className="flex flex-col gap-2 py-2">
              {section.routes.map((routes) => (
                <Link
                  href={routes.href}
                  key={routes.name}
                  className="hover:bg-neutral-800 p-2 -ml-2 rounded-md capitalize flex flex-row gap-4 justify-start items-center group transition-all *:transition-all duration-200 *:duration-200"
                >
                  {routes.icon}
                  <span className="group-hover:text-white text-neutral-300">
                    {routes.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

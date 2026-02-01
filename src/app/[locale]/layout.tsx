import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { JSX } from "react";
import MobileTopNav from "./_components/MobileTopNav";
import Sidebar from "./_components/Sidebar";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | Yip Jun Kai",
    default: "Yip Jun Kai"
  },
  description: "My portfolio | Software developer in Singapore, focused on frontend"
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

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
          icon: <HomeIcon className="size-4" />
        },
        {
          name: "experience",
          href: "/experience",
          icon: <BriefcaseIcon className="size-4" />
        },
        {
          name: "projects",
          href: "/projects",
          icon: <CodeBracketIcon className="size-4" />
        }
      ]
    },
    {
      name: "Connect",
      routes: [
        {
          name: "Email",
          href: "mailto:hello@yipjunkai.com",
          icon: <EnvelopeIcon className="size-4" />
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/yipjk/",
          icon: <LinkedinIcon className="size-4" />
        },
        {
          name: "Github",
          href: "https://github.com/yipjunkai",
          icon: <GithubIcon className="size-4" />
        }
      ]
    }
  ];

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider disableTransitionOnChange>
            <div className="absolute left-1/2 z-0 hidden h-full w-1/2 bg-gray-50 lg:block dark:bg-[#131313]"></div>
            <div
              className="absolute left-1/2 z-10
         mx-auto flex h-screen w-full max-w-7xl -translate-x-1/2 flex-col lg:flex-row *:lg:h-full"
            >
              <Sidebar sections={sections} />
              <MobileTopNav sections={sections} />
              <main className="grow overflow-y-auto bg-gray-50 *:mx-auto *:mt-12 *:w-full *:max-w-[900px] *:px-8 *:pb-24 *:md:px-6 *:lg:mt-24 *:lg:px-4 dark:bg-[#131313]">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

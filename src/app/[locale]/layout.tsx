import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/solid";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { JSX } from "react";
import MobileTopNav from "./_components/MobileTopNav";
import ScrollToTop from "./_components/ScrollToTop";
import Sidebar from "./_components/Sidebar";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config";

interface Routes {
  name: string;
  href: string;
  icon: JSX.Element;
}

export interface Sections {
  name: string;
  routes: Routes[];
}

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      template: `%s | ${t("siteName")}`,
      default: t("siteName")
    },
    description: t("siteDescription")
  };
}

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

  const t = await getTranslations("nav");

  const sections: Sections[] = [
    {
      name: t("sections.aboutMe.title"),
      routes: [
        {
          name: t("sections.aboutMe.routes.home"),
          href: "/",
          icon: <HomeIcon className="size-4" />
        },
        {
          name: t("sections.aboutMe.routes.experience"),
          href: "/experience",
          icon: <BriefcaseIcon className="size-4" />
        },
        {
          name: t("sections.aboutMe.routes.projects"),
          href: "/projects",
          icon: <CodeBracketIcon className="size-4" />
        }
      ]
    },
    {
      name: t("sections.connect.title"),
      routes: [
        {
          name: t("sections.connect.routes.email"),
          href: `mailto:${siteConfig.email}`,
          icon: <EnvelopeIcon className="size-4" />
        },
        {
          name: t("sections.connect.routes.linkedin"),
          href: siteConfig.links.linkedin,
          icon: <LinkedinIcon className="size-4" />
        },
        {
          name: t("sections.connect.routes.github"),
          href: siteConfig.links.github,
          icon: <GithubIcon className="size-4" />
        }
      ]
    }
  ];

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider disableTransitionOnChange>
            <div className="fixed left-1/2 -z-10 hidden h-screen w-1/2 bg-gray-50 lg:block dark:bg-[#131313]"></div>
            <div className="absolute left-1/2 z-10 mx-auto flex h-svh w-full max-w-7xl -translate-x-1/2 flex-col lg:flex-row *:lg:h-full">
              <Sidebar sections={sections} />
              <MobileTopNav sections={sections} />
              <main className="grow overflow-y-auto bg-gray-50 *:mx-auto *:mt-12 *:w-full *:max-w-[900px] *:px-8 *:pb-24 *:md:px-6 *:lg:mt-24 dark:bg-[#131313]">
                <ScrollToTop />
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

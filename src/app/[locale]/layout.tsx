import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import MobileTopNav from "./_components/MobileTopNav";
import ScrollToTop from "./_components/ScrollToTop";
import ContentEngagementTracker from "./_components/ContentEngagementTracker";
import { buildNavSections } from "./_components/navSections";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { requireLocale } from "@/i18n/locale";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config";
import { getPageMetadata, getTitleMetadata } from "@/lib/seo";
import { JsonLd, getWebsiteJsonLd } from "@/lib/jsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

// The CJK face. Geist has no Chinese glyphs, so without this every character on
// /zh-SG is rendered by whatever the visitor's OS supplies — PingFang on macOS,
// Microsoft YaHei on Windows, Noto Sans CJK on Android. Geist still wins the
// Latin, because it is listed first in --font-sans (globals.css); this face is
// only ever reached for glyphs Geist does not have.
//
// `preload: false` is required, not incidental: Google declares no subset for
// CJK families, so next/font has nothing to generate a preload link from and
// errors if preloading is left on. The face still downloads via @font-face,
// sliced by unicode-range, so only the ranges the page touches are fetched.
// Weights are pinned to the two the design system allows (DESIGN.md, The
// Two-Weight Rule).
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: ["400", "700"],
  preload: false
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const t = await getTranslations({ locale, namespace: "content.meta" });

  return {
    title: getTitleMetadata(t("siteName")),
    ...getPageMetadata({
      locale,
      pathname: "/",
      siteName: t("siteName"),
      description: t("siteDescription")
    })
  };
}

export default async function RootLayout({
  children,
  sidebar,
  params
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);

  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "content.meta" });
  const sections = await buildNavSections(locale);

  const websiteJsonLd = getWebsiteJsonLd({
    locale,
    name: tMeta("siteName"),
    description: tMeta("siteDescription")
  });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      // The font variables live on <html>, not <body>: Tailwind's preflight sets
      // font-family on <html>, so a variable defined one level lower can't resolve
      // there and the mapping in globals.css would silently fall back to system.
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable}`}
    >
      <body className="antialiased">
        <link rel="prefetch" as="fetch" href={siteConfig.resume.url} crossOrigin="anonymous" />
        <JsonLd data={websiteJsonLd} />
        <NextIntlClientProvider>
          <ThemeProvider disableTransitionOnChange>
            <div className="fixed left-1/2 -z-10 hidden h-screen w-1/2 bg-gray-50 lg:block dark:bg-[#131313]"></div>
            <div className="absolute left-1/2 z-10 mx-auto flex h-svh w-full max-w-7xl -translate-x-1/2 flex-col lg:flex-row *:lg:h-full">
              {sidebar}
              <MobileTopNav sections={sections} />
              <main className="grow overflow-y-auto bg-gray-50 *:mx-auto *:mt-12 *:w-full *:max-w-[900px] *:px-8 *:pb-24 *:md:px-6 *:lg:mt-24 dark:bg-[#131313]">
                <ScrollToTop />
                <ContentEngagementTracker />
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

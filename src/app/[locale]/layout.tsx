import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable}`}
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

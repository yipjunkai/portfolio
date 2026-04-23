import { siteConfig } from "@/config";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale, type Pathname } from "@/i18n/routing";
import type { Metadata } from "next";

function toOpenGraphLocale(locale: Locale) {
  return locale.replace("-", "_");
}

export function getTitleTemplate(siteName: string) {
  return `%s | ${siteName}`;
}

export function getTitleMetadata(siteName: string): Exclude<Metadata["title"], null | undefined> {
  return {
    template: getTitleTemplate(siteName),
    default: siteName
  };
}

function getFullTitle(siteName: string, title?: string) {
  return title ? getTitleTemplate(siteName).replace("%s", title) : siteName;
}

export function getLanguageAlternates(pathname: Pathname) {
  const languages = routing.locales.reduce(
    (acc, locale) => {
      acc[locale] = new URL(getPathname({ href: pathname, locale }), siteConfig.url).toString();
      return acc;
    },
    {} as Record<string, string>
  );

  languages["x-default"] = new URL(getPathname({ href: pathname, locale: routing.defaultLocale }), siteConfig.url).toString();

  return languages;
}

export function getPageMetadata({
  locale,
  pathname,
  siteName,
  description,
  title
}: {
  locale: Locale;
  pathname: Pathname;
  siteName: string;
  description: string;
  title?: string;
}): Metadata {
  const canonical = new URL(getPathname({ href: pathname, locale }), siteConfig.url).toString();
  const fullTitle = getFullTitle(siteName, title);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(pathname)
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName,
      locale: toOpenGraphLocale(locale),
      alternateLocale: routing.locales.filter(currentLocale => currentLocale !== locale).map(toOpenGraphLocale),
      type: "website",
      images: [{ url: "/opengraph-image.png" }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/twitter-image.png"]
    }
  };
}

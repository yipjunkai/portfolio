import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { siteConfig } from "@/config";
import type { Pathname } from "@/i18n/routing";

const routes: Pathname[] = ["/", "/experience", "/projects"];

const generateLanguageAlternates = (path: Pathname) => {
  return routing.locales.reduce((acc, locale) => {
    acc[locale] = siteConfig.url + getPathname({ href: path, locale });
    return acc;
  }, {} as Languages<string>);
};

const generateSitemap = (path: Pathname) => {
  return {
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: generateLanguageAlternates(path)
    }
  };
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => generateSitemap(route));
}

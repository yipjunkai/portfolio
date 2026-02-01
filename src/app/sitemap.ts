import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

const BASE_URL = "https://www.yipjunkai.com";

const routes = ["/", "/experience", "/projects"];

const generateLanguageAlternates = (path: string) => {
  return routing.locales.reduce((acc, locale) => {
    acc[locale] = BASE_URL + getPathname({ href: path, locale });
    return acc;
  }, {} as Languages<string>);
};

const generateSitemap = (path: string) => {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    alternates: {
      languages: generateLanguageAlternates(path)
    }
  };
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => generateSitemap(route));
}

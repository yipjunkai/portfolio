import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";
import type { Pathname } from "@/i18n/routing";
import { getLanguageAlternates } from "@/lib/seo";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const routes: Pathname[] = ["/", "/experience", "/projects"];

const BUILD_TIME = new Date();

const generateSitemap = (path: Pathname) => {
  return {
    url: new URL(getPathname({ href: path, locale: routing.defaultLocale }), siteConfig.url).toString(),
    lastModified: BUILD_TIME,
    alternates: {
      languages: getLanguageAlternates(path)
    }
  };
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => generateSitemap(route));
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";
import type { StaticPathname } from "@/i18n/routing";
import { getLanguageAlternates } from "@/lib/seo";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

const staticRoutes: StaticPathname[] = ["/", "/experience", "/projects", "/blog"];

const BUILD_TIME = new Date();

const generateSitemap = (path: StaticPathname) => {
  return {
    url: new URL(getPathname({ href: path, locale: routing.defaultLocale }), siteConfig.url).toString(),
    lastModified: BUILD_TIME,
    alternates: {
      languages: getLanguageAlternates(path)
    }
  };
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map(generateSitemap);

  const postEntries = getAllPosts().map(post => {
    const href = { pathname: "/blog/[slug]" as const, params: { slug: post.slug } };
    return {
      url: new URL(getPathname({ href, locale: routing.defaultLocale }), siteConfig.url).toString(),
      lastModified: new Date(post.updated ?? post.date),
      alternates: {
        languages: getLanguageAlternates(href)
      }
    };
  });

  return [...staticEntries, ...postEntries];
}

import { siteConfig } from "@/config";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale, type StaticPathname } from "@/i18n/routing";
import type { BlogPosting, Person, WebSite, WithContext } from "schema-dts";

const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

function absoluteUrl(path: StaticPathname, locale: Locale) {
  return new URL(getPathname({ href: path, locale }), siteConfig.url).toString();
}

export function getPersonJsonLd({
  locale,
  name,
  jobTitle,
  description
}: {
  locale: Locale;
  name: string;
  jobTitle: string;
  description: string;
}): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    jobTitle,
    description,
    url: absoluteUrl("/", locale),
    email: `mailto:${siteConfig.email}`,
    image: new URL("/opengraph-image.png", siteConfig.url).toString(),
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    knowsLanguage: [...routing.locales]
  };
}

export function getWebsiteJsonLd({
  locale,
  name,
  description
}: {
  locale: Locale;
  name: string;
  description: string;
}): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    description,
    url: absoluteUrl("/", locale),
    inLanguage: locale,
    author: { "@id": PERSON_ID }
  };
}

export function getBlogPostingJsonLd({
  locale,
  slug,
  title,
  description,
  datePublished,
  dateModified,
  authorName
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}): WithContext<BlogPosting> {
  const url = new URL(getPathname({ href: { pathname: "/blog/[slug]", params: { slug } }, locale }), siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    inLanguage: locale,
    author: { "@type": "Person", "@id": PERSON_ID, name: authorName },
    publisher: { "@id": PERSON_ID }
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

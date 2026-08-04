import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireLocale } from "@/i18n/locale";
import { getPageMetadata } from "@/lib/seo";
import { JsonLd, getBlogPostingJsonLd } from "@/lib/jsonLd";
import { Badge } from "@/components/ui/badge";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { Mdx } from "../_components/Mdx";

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale, slug } = await params;
  const locale = requireLocale(requestedLocale);
  const post = getPost(slug);
  if (!post) return {};

  const tMeta = await getTranslations({ locale, namespace: "content.meta" });

  return getPageMetadata({
    locale,
    pathname: { pathname: "/blog/[slug]", params: { slug } },
    siteName: tMeta("siteName"),
    title: post.meta.title,
    description: post.meta.description
  });
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: requestedLocale, slug } = await params;
  const locale = requireLocale(requestedLocale);
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "common.blog" });
  const tMeta = await getTranslations({ locale, namespace: "content.meta" });

  const jsonLd = getBlogPostingJsonLd({
    locale,
    slug: post.meta.slug,
    title: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    dateModified: post.meta.updated,
    authorName: tMeta("siteName")
  });

  return (
    <div className="space-y-8">
      <JsonLd data={jsonLd} />

      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        {t("backToBlog")}
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <Badge>{t(`categories.${post.meta.category}`)}</Badge>
          <time dateTime={post.meta.date}>{formatPostDate(post.meta.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{t("readingTime", { minutes: post.meta.readingMinutes })}</span>
        </div>
        <h1 className="text-4xl font-bold text-balance">{post.meta.title}</h1>
        {post.meta.description && <p className="text-lg text-pretty text-muted-foreground">{post.meta.description}</p>}
      </header>

      <article className="prose max-w-none prose-neutral dark:prose-invert prose-pre:border-0 prose-pre:bg-transparent prose-pre:p-0">
        <Mdx source={post.content} />
      </article>
    </div>
  );
}

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { requireLocale } from "@/i18n/locale";
import { getAllPosts, getPost, getPostHeadings } from "@/lib/blog";
import BlogTocRail from "../../../blog/_components/BlogTocRail";

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export const dynamicParams = false;

/** @sidebar slot for a single post: replaces the nav with a back link + this post's TOC. */
export default async function BlogPostSidebar({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: requestedLocale, slug } = await params;
  const locale = requireLocale(requestedLocale);

  const post = getPost(slug);
  if (!post) notFound();

  const headings = getPostHeadings(slug);
  const tNav = await getTranslations({ locale, namespace: "common.nav" });
  const tBlog = await getTranslations({ locale, namespace: "common.blog" });

  return (
    <BlogTocRail
      headings={headings}
      labels={{
        portfolio: tNav("portfolio"),
        logoAlt: tNav("logoAlt"),
        back: tBlog("backToBlog"),
        onThisPage: tBlog("onThisPage")
      }}
    />
  );
}

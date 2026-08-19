import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireLocale } from "@/i18n/locale";
import { getPageMetadata } from "@/lib/seo";
import { BLOG_CATEGORIES, formatPostDate, getPostsByCategory } from "@/lib/blog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const tMeta = await getTranslations("content.meta");
  const tPage = await getTranslations("content.meta.pages.blog");

  return getPageMetadata({
    locale,
    pathname: "/blog",
    siteName: tMeta("siteName"),
    title: tPage("title"),
    description: tPage("description")
  });
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const t = await getTranslations("common.blog");

  const grouped = getPostsByCategory();
  const activeCategories = BLOG_CATEGORIES.filter(category => grouped[category].length > 0);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="text-pretty text-muted-foreground">{t("subtitle")}</p>
      </header>

      {activeCategories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-700">
          <p className="text-muted-foreground">{t("empty")}</p>
        </div>
      ) : (
        <div className="space-y-12">
          {activeCategories.map(category => (
            <section key={category} aria-label={t(`categories.${category}`)} className="space-y-4">
              <h2 className="text-xs font-bold text-neutral-600 uppercase dark:text-neutral-400">{t(`categories.${category}`)}</h2>
              <ul className="flex flex-col gap-6">
                {grouped[category].map(post => (
                  <li key={post.slug}>
                    <article className="group">
                      <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }} className="block space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-xl font-semibold transition-colors group-hover:text-grad-1">{post.title}</h3>
                          <time dateTime={post.date} className="shrink-0 text-sm text-muted-foreground">
                            {formatPostDate(post.date, locale)}
                          </time>
                        </div>
                        {post.description && <p className="text-pretty text-muted-foreground">{post.description}</p>}
                        <p className="text-sm text-muted-foreground">{t("readingTime", { minutes: post.readingMinutes })}</p>
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

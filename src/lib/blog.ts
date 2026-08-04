import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const BLOG_CATEGORIES = ["guide", "experiment", "note"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

export interface PostFrontmatter {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-08-03" */
  date: string;
  /** Optional ISO date for the last meaningful update */
  updated?: string;
  category: BlogCategory;
  tags: string[];
  draft: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface Post {
  meta: PostMeta;
  /** Raw MDX body with frontmatter stripped */
  content: string;
}

function isBlogCategory(value: unknown): value is BlogCategory {
  return typeof value === "string" && (BLOG_CATEGORIES as readonly string[]).includes(value);
}

/**
 * Normalize a frontmatter date to an ISO `YYYY-MM-DD` string.
 * YAML parses unquoted dates (e.g. `date: 2026-08-03`) into `Date` objects, so accept both.
 */
function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value.trim();
  }
  return undefined;
}

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parseFile(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const date = toIsoDate(data.date);

  if (typeof data.title !== "string" || !date || !isBlogCategory(data.category)) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx — "title", "date", and a valid "category" (${BLOG_CATEGORIES.join(
        " | "
      )}) are required.`
    );
  }

  const meta: PostMeta = {
    slug,
    title: data.title,
    description: typeof data.description === "string" ? data.description : "",
    date,
    updated: toIsoDate(data.updated),
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [],
    draft: data.draft === true,
    readingMinutes: readingMinutes(content)
  };

  return { meta, content };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(file => file.endsWith(".mdx"))
    .map(file => file.replace(/\.mdx$/, ""));
}

export function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): PostMeta[] {
  return getPostSlugs()
    .map(parseFile)
    .filter((post): post is Post => post !== null)
    .map(post => post.meta)
    .filter(meta => includeDrafts || !meta.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns a published post, or null if the slug is missing or the post is a draft. */
export function getPost(slug: string): Post | null {
  const post = parseFile(slug);
  if (!post || post.meta.draft) return null;
  return post;
}

export function getPostsByCategory(): Record<BlogCategory, PostMeta[]> {
  const grouped = Object.fromEntries(BLOG_CATEGORIES.map(category => [category, [] as PostMeta[]])) as Record<
    BlogCategory,
    PostMeta[]
  >;

  for (const meta of getAllPosts()) {
    grouped[meta.category].push(meta);
  }

  return grouped;
}

export function formatPostDate(iso: string, locale: string): string {
  // Format in UTC so a date-only value renders as the same calendar day in every timezone.
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(iso)
  );
}

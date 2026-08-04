import type { ComponentProps } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import { Callout } from "./Callout";

const prettyCodeOptions: RehypePrettyCodeOptions = {
  // Dual themes emit --shiki-light / --shiki-dark CSS vars; the .dark swap lives in globals.css.
  theme: { light: "github-light", dark: "github-dark" },
  // Scope the fallback language to fenced BLOCKS only. A bare-string defaultLang also targets
  // inline code, which would Shiki-highlight every `inline` span in prose (wrong color in dark mode).
  defaultLang: { block: "plaintext" },
  // Leave inline code alone — it's styled as a theme-aware chip by the prose CSS in globals.css.
  bypassInlineCode: true
};

const components = {
  Callout,
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const isExternal = /^https?:\/\//.test(href);
    return <a href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props} />;
  }
};

const options: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], [rehypePrettyCode, prettyCodeOptions]]
  }
};

/** Renders an MDX post body (frontmatter already stripped) at the RSC layer. */
export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} options={options} components={components} />;
}

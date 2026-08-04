import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  localePrefix: "as-needed",
  locales: ["en-SG", "zh-SG"],
  defaultLocale: "en-SG",
  pathnames: {
    "/": "/",
    "/experience": {
      "zh-SG": "/经历"
    },
    "/projects": {
      "zh-SG": "/项目"
    },
    "/blog": {
      "zh-SG": "/博客"
    },
    "/blog/[slug]": {
      "zh-SG": "/博客/[slug]"
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
/** Pathnames without dynamic segments — safe to use as a bare-string href. */
export type StaticPathname = Exclude<Pathname, `${string}[${string}]${string}`>;

//todo add US locale

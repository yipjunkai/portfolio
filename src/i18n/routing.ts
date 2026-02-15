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
    }
  }
});

export type Pathname = keyof typeof routing.pathnames;

//todo add US locale

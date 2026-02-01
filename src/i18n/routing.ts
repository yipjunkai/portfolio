import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  localePrefix: "as-needed",
  locales: ["en-SG", "zh-SG"],
  defaultLocale: "en-SG"
});

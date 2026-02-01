import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  localePrefix: "as-needed",
  locales: ["en-SG", "en-US", "zh-CN", "zh-SG"],
  defaultLocale: "en-SG"
});

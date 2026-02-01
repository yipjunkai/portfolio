import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

function deepMerge<T extends Record<string, unknown>>(fallback: T, locale: T): T {
  const result = { ...fallback };

  for (const key in locale) {
    if (locale[key] && typeof locale[key] === "object" && !Array.isArray(locale[key])) {
      result[key] = deepMerge((result[key] as Record<string, unknown>) || {}, locale[key] as Record<string, unknown>) as T[Extract<
        keyof T,
        string
      >];
    } else {
      result[key] = locale[key];
    }
  }

  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // Always load en-SG as the fallback base
  const fallbackMessages = (await import(`../../messages/en-SG.json`)).default;

  // Load locale-specific messages
  const localeMessages = (await import(`../../messages/${locale}.json`)).default;

  // Merge: locale-specific values override fallback
  const messages = deepMerge(fallbackMessages, localeMessages);

  return {
    locale,
    messages
  };
});

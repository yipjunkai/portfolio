import * as rootParams from "next/root-params";
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

export default getRequestConfig(async () => {
  // The proxy rejects unknown locale prefixes; retain the fallback as a defensive
  // default rather than changing this request path into a 404.
  const requested = await rootParams.locale();

  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // English supplies any missing locale keys.
  const fallbackMessages = (await import(`../../messages/en-SG.json`)).default;

  const localeMessages = (await import(`../../messages/${locale}.json`)).default;

  const messages = deepMerge(fallbackMessages, localeMessages);

  return {
    locale,
    messages
  };
});

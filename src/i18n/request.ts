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
  // Read straight off the root layout's `[locale]` segment. This replaces the old
  // `requestLocale` plus a `setRequestLocale(locale)` call in every page: a static
  // render used to have no way to know its own locale, so each page had to hand it
  // over. next/root-params (Next 16.3) removes that obligation.
  //
  // Still falling back to defaultLocale rather than calling notFound() on an
  // unrecognised value, which is what this did before. The proxy redirects unknown
  // prefixes long before they reach here, so the fallback is close to unreachable —
  // but making a 404 out of it is a behaviour change, not part of this migration.
  const requested = await rootParams.locale();

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

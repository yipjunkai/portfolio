import { posthog } from "posthog-js";

/** No-op outside production builds with a PostHog key, so callers need no guard. */
const analyticsEnabled = process.env["NODE_ENV"] === "production" && !!process.env["NEXT_PUBLIC_POSTHOG_KEY"];

export function capture(event: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled) return;
  posthog.capture(event, properties);
}

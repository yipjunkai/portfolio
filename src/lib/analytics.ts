import { posthog } from "posthog-js";

/**
 * Analytics is enabled only in production builds that carry a PostHog key,
 * mirroring the init guard in instrumentation-client.ts. Everywhere else
 * (local dev, previews without a key) this is a no-op, so call sites can fire
 * events unconditionally without guarding each one.
 */
const analyticsEnabled = process.env["NODE_ENV"] === "production" && !!process.env["NEXT_PUBLIC_POSTHOG_KEY"];

export function capture(event: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled) return;
  posthog.capture(event, properties);
}

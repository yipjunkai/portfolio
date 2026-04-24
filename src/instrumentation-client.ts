import { posthog } from "posthog-js";

if (process.env["NODE_ENV"] === "production" && process.env["NEXT_PUBLIC_POSTHOG_KEY"]) {
  posthog.init(process.env["NEXT_PUBLIC_POSTHOG_KEY"] as string, {
    api_host: "/relay-buRP",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30"
  });
}

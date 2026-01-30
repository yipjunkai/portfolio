import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest } from "next/server";

const localeMiddleware = createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, `/_vercel` or `/relay-buRP`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|relay-buRP|.*\\..*).*)"],
};

export default function proxy(request: NextRequest) {
  return localeMiddleware(request);
}

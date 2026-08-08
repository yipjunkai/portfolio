import Image from "next/image";
import theVoid from "./_assets/undraw_the-void_i26b.svg";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Labels come from the nav rather than their own keys: a 404 that lists routes under
// different names than the sidebar is worse than one that lists none.
const ROUTES = [
  { href: "/", key: "home" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" }
] as const;

export default function NotFound() {
  const t = useTranslations("common.notFound");
  const tRoutes = useTranslations("common.nav.sections.aboutMe.routes");

  return (
    <div className="space-y-8">
      {/* Above the fold and the LCP element on this route — without `priority` Next lazy-loads
          it and the page paints empty first. */}
      <Image src={theVoid} alt={t("illustrationAlt")} priority className="size-60" />

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="text-pretty">{t("body")}</p>
      </div>

      <nav aria-label={t("routesLabel")} className="space-y-4 border-t pt-8">
        <p className="font-mono text-sm text-muted-foreground">{t("routesLabel")}</p>
        <ul className="flex flex-col gap-2">
          {ROUTES.map(({ href, key }) => (
            <li key={key}>
              {/* Sans, not mono: these are the primary action on this page, and mono is the
                  orientation register — the substance of a claim or an action stays in sans. */}
              <Link href={href} className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                {tRoutes(key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

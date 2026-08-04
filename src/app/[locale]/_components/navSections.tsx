import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import { BookOpenIcon, BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/24/solid";
import { getTranslations } from "next-intl/server";
import type { JSX } from "react";
import { siteConfig } from "@/config";
import type { Locale, StaticPathname } from "@/i18n/routing";

interface BaseRoute {
  name: string;
  icon: JSX.Element;
}

export interface InternalRoute extends BaseRoute {
  href: StaticPathname;
  external?: false;
}

export interface ExternalRoute extends BaseRoute {
  href: string;
  external: true;
}

export type Route = InternalRoute | ExternalRoute;

export interface Sections {
  name: string;
  routes: Route[];
}

/** Builds the global navigation used by the desktop sidebar and the mobile top nav. */
export async function buildNavSections(locale: Locale): Promise<Sections[]> {
  const t = await getTranslations({ locale, namespace: "common.nav" });

  return [
    {
      name: t("sections.aboutMe.title"),
      routes: [
        { name: t("sections.aboutMe.routes.home"), href: "/", icon: <HomeIcon className="size-4" /> },
        { name: t("sections.aboutMe.routes.experience"), href: "/experience", icon: <BriefcaseIcon className="size-4" /> },
        { name: t("sections.aboutMe.routes.projects"), href: "/projects", icon: <CodeBracketIcon className="size-4" /> },
        { name: t("sections.aboutMe.routes.blog"), href: "/blog", icon: <BookOpenIcon className="size-4" /> }
      ]
    },
    {
      name: t("sections.connect.title"),
      routes: [
        {
          name: t("sections.connect.routes.email"),
          href: `mailto:${siteConfig.email}`,
          icon: <EnvelopeIcon className="size-4" />,
          external: true
        },
        {
          name: t("sections.connect.routes.linkedin"),
          href: siteConfig.links.linkedin,
          icon: <LinkedinIcon className="size-4" />,
          external: true
        },
        {
          name: t("sections.connect.routes.github"),
          href: siteConfig.links.github,
          icon: <GithubIcon className="size-4" />,
          external: true
        }
      ]
    }
  ];
}

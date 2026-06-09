import type { Metadata } from "next";
import { AnimatedIconButton } from "@/components/ui/animated-icon-button";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { DownloadIcon } from "@/components/ui/download";
import { SendIcon } from "@/components/ui/send";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { requireLocale } from "@/i18n/locale";
import { getPageMetadata } from "@/lib/seo";
import { JsonLd, getPersonJsonLd } from "@/lib/jsonLd";
import EmailMeDialog from "./_components/EmailMeDialog";
import ResumePDFDialog from "./_components/ResumePDFDialog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const tMeta = await getTranslations({ locale, namespace: "content.meta" });

  return getPageMetadata({
    locale,
    pathname: "/",
    siteName: tMeta("siteName"),
    description: tMeta("siteDescription")
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "content.home" });
  const tCommon = await getTranslations({ locale, namespace: "common.home" });
  const tMeta = await getTranslations({ locale, namespace: "content.meta" });

  const personJsonLd = getPersonJsonLd({
    locale,
    name: tMeta("siteName"),
    jobTitle: tMeta("jobTitle"),
    description: tMeta("siteDescription")
  });

  return (
    <>
      <JsonLd data={personJsonLd} />
      <div className="h-[calc(100svh-8rem)] space-y-8 md:h-min">
        <h1 className="md:font-bold">
          <span className="text-3xl md:text-5xl">{t("greeting")}</span>
          <br className="block md:hidden" />
          <span className="text-7xl font-bold md:text-5xl">{t("name")}</span>
        </h1>
        <h2 className="flex flex-row items-center gap-2 font-mono text-2xl">
          <MapPinIcon className="size-6" />
          <span>{t("location")}</span>
        </h2>
        <p className="text-justify text-pretty whitespace-pre-line">{t("aboutMe")}</p>
        <div className="flex flex-col gap-4 *:flex *:items-center *:gap-4 *:text-2xl lg:flex-row">
          <ResumePDFDialog>
            <AnimatedIconButton variant="default" icon={DownloadIcon} label={tCommon("viewCv")} />
          </ResumePDFDialog>
          <EmailMeDialog>
            <AnimatedIconButton variant="secondary" icon={SendIcon} label={tCommon("emailMe")} />
          </EmailMeDialog>
        </div>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { DocumentArrowDownIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { getTranslations, setRequestLocale } from "next-intl/server";
import EmailMeDialog from "./_components/EmailMeDialog";
import ResumePDFDialog from "./_components/ResumePDFDialog";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
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
            <Button variant="default">
              <DocumentArrowDownIcon className="size-6" />
              <span>{t("viewCv")}</span>
            </Button>
          </ResumePDFDialog>
          <EmailMeDialog>
            <Button variant="secondary">
              <EnvelopeIcon className="size-6" />
              <span>{t("emailMe")}</span>
            </Button>
          </EmailMeDialog>
        </div>
      </div>
    </>
  );
}

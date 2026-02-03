import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import EmailMeDialog from "./_components/EmailMeDialog";
import { MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import ResumePDFDialog from "./_components/ResumePDFDialog";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("home");

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
          <EmailMeDialog>
            <Button variant="default">
              <MailIcon className="size-6" />
              <span>{t("emailMe")}</span>
            </Button>
          </EmailMeDialog>
          <ResumePDFDialog>
            <Button variant="secondary">
              <ArrowDownTrayIcon className="size-6" />
              <span>{t("viewCv")}</span>
            </Button>
          </ResumePDFDialog>
        </div>
      </div>
    </>
  );
}

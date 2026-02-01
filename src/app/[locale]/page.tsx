import { Link } from "@/i18n/navigation";
import { ArrowDownTrayIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const EMAIL = "hello@yipjunkai.com";
  const CV_URL = "https://drive.google.com/file/d/1GX6PJwhGFxjW6eEtaDDV7MYaZxfKXNxp/view?usp=sharing";

  const ABOUT_ME =
    "Software developer with a passion for frontend technologies.\n\nExtensive experience in Web, Mobile application and Desktop application development; in both frontend and backend, both at startup and large company. Adept understanding of AI/ML gained through research project.";

  return (
    <>
      <div className="h-[calc(100vh-8rem)] space-y-8 md:h-min">
        <h1 className="md:font-bold">
          <span className="text-3xl md:text-5xl">Hey, I&apos;m </span>
          <br className="block md:hidden" />
          <span className="text-7xl font-bold md:text-5xl">Jun Kai</span>
        </h1>
        <h2 className="flex flex-row items-center gap-2 font-mono text-2xl">
          <MapPinIcon className="size-6" />
          <span>Singapore</span>
        </h2>
        <p className="text-justify text-pretty whitespace-pre-line">{ABOUT_ME}</p>
        <div className="flex flex-col gap-4 *:flex *:items-center *:gap-4 *:text-2xl lg:flex-row">
          <Link href={`mailto:${EMAIL}`} className="primary-button">
            <EnvelopeIcon className="size-6" />
            <span>Email me</span>
          </Link>
          <Link href={CV_URL} className="secondary-button" target="_blank">
            <ArrowDownTrayIcon className="size-6" />
            <span>Download CV</span>
          </Link>
        </div>
      </div>
    </>
  );
}

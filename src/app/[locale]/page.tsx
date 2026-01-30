import { Link } from "@/i18n/navigation";
import {
  ArrowDownTrayIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const EMAIL = "hello@yipjunkai.com";
  const CV_URL =
    "https://drive.google.com/file/d/1GX6PJwhGFxjW6eEtaDDV7MYaZxfKXNxp/view?usp=sharing";

  const ABOUT_ME =
    "Software developer with a passion for frontend technologies.\n\nExtensive experience in Web, Mobile application and Desktop application development; in both frontend and backend, both at startup and large company. Adept understanding of AI/ML gained through research project.";

  return (
    <>
      <div className="h-[calc(100vh-8rem)] md:h-min space-y-8">
        <h1 className="md:font-bold">
          <span className="text-3xl md:text-5xl">Hey, I&apos;m </span>
          <br className="block md:hidden" />
          <span className="text-7xl md:text-5xl font-bold">Jun Kai</span>
        </h1>
        <h2 className="text-2xl font-mono flex flex-row items-center gap-2">
          <MapPinIcon className="size-6" />
          <span>Singapore</span>
        </h2>
        <p className="text-pretty text-justify whitespace-pre-line">
          {ABOUT_ME}
        </p>
        <div className="flex flex-col lg:flex-row gap-4 *:flex *:items-center *:gap-4 *:text-2xl">
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

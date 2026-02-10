import TechStackBubble from "@/components/shared/TechStackBubble";
import LaptopTemplate from "./_components/LaptopTemplate";
import MobileTemplate from "./_components/MobileTemplate";
import Image from "next/image";
import oceanfrontHardwareLaptop from "./_assets/oceanfront-hardware-laptop.webp";
import oceanfrontHardwareMobile from "./_assets/oceanfront-hardware-mobile.webp";
import ImageCarousel from "./_components/ImageCarousel";
import { Link } from "@/i18n/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pages.projects" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  const projects = [
    {
      name: t("oceanfrontHardware.name"),
      role: t("oceanfrontHardware.role"),
      description: t("oceanfrontHardware.description"),
      bulletPoints: [t("oceanfrontHardware.bullet1"), t("oceanfrontHardware.bullet2"), t("oceanfrontHardware.bullet3")],
      techStack: ["Nuxt", "Typescript", "Strapi", "Stripe"],
      laptopImage: {
        src: oceanfrontHardwareLaptop,
        alt: t("oceanfrontHardware.laptopAlt")
      },
      mobileImage: {
        src: oceanfrontHardwareMobile,
        alt: t("oceanfrontHardware.mobileAlt")
      },
      link: "https://oceanfronthardware.com.sg/"
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <div className="flex flex-col gap-4">
        {projects.map(project => (
          <div key={project.name} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              {project.description.trim() !== "" && <p className="text-pretty whitespace-pre-wrap">{project.description}</p>}
              {project.link.trim() !== "" && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <GlobeAltIcon className="size-6" />
                  <span>{t("labels.website")}</span>
                </Link>
              )}
              <ul className="list-inside list-disc">
                {project.bulletPoints.map(bulletPoint => (
                  <li key={bulletPoint} className="text-pretty">
                    {bulletPoint}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <TechStackBubble key={tech} tech={tech} />
                ))}
              </div>
            </div>
            <MobileTemplate className="hidden md:block">
              <Image
                src={project.mobileImage.src}
                alt={project.mobileImage.alt}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%"
                }}
              />
            </MobileTemplate>
            <LaptopTemplate className="hidden md:col-span-2 md:block">
              <Image
                src={project.laptopImage.src}
                alt={project.laptopImage.alt}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%"
                }}
              />
            </LaptopTemplate>
            <ImageCarousel images={[project.mobileImage, project.laptopImage]} className="md:hidden" />
          </div>
        ))}
      </div>
    </div>
  );
}

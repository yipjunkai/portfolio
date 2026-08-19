import { Badge, badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";
import LaptopTemplate from "./_components/LaptopTemplate";
import MobileTemplate from "./_components/MobileTemplate";
import ExtensionPopupPreview from "./_components/ExtensionPopupPreview";
import PyvolrPerfPreview from "./_components/PyvolrPerfPreview";
import Image, { type StaticImageData } from "next/image";
import oceanfrontHardwareMobile from "./_assets/oceanfront-hardware-mobile.webp";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import GithubIcon from "@/components/icons/GithubIcon";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/components/lib/utils";
import { requireLocale } from "@/i18n/locale";
import { Fragment, type ReactNode } from "react";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale = requireLocale(requestedLocale);
  const tMeta = await getTranslations("content.meta");
  const tPage = await getTranslations("content.meta.pages.projects");

  return getPageMetadata({
    locale,
    pathname: "/projects",
    siteName: tMeta("siteName"),
    title: tPage("title"),
    description: tMeta("siteDescription")
  });
}

export default async function Projects() {
  const t = await getTranslations("content.projects");
  const tUI = await getTranslations("common.projects");
  const tCommon = await getTranslations("common");

  const projects: {
    name: string;
    role: string;
    description: string;
    bulletPoints: string[];
    techStack: { name: string; section: string }[];
    laptopImage?: { src: StaticImageData; alt: string };
    mobileImage?: { src: StaticImageData; alt: string };
    preview?: ReactNode;
    previewPosition?: "side" | "top";
    link: string;
    linkType?: "website" | "github";
  }[] = [
    {
      name: t("oceanfrontHardware.name"),
      role: t("oceanfrontHardware.role"),
      description: t("oceanfrontHardware.description"),
      bulletPoints: [t("oceanfrontHardware.bullet1"), t("oceanfrontHardware.bullet2"), t("oceanfrontHardware.bullet3")],
      techStack: [
        { name: "Next.js", section: "frontend" },
        { name: "Typescript", section: "language" },
        { name: "Strapi", section: "backend" },
        { name: "Stripe", section: "service" },
        { name: "Meilisearch", section: "backend" }
      ],
      mobileImage: {
        src: oceanfrontHardwareMobile,
        alt: t("oceanfrontHardware.mobileAlt")
      },
      link: "https://oceanfronthardware.com.sg/",
      linkType: "website"
    },
    {
      name: t("pyvolr.name"),
      role: t("pyvolr.role"),
      description: t("pyvolr.description"),
      bulletPoints: [t("pyvolr.bullet1"), t("pyvolr.bullet2"), t("pyvolr.bullet3")],
      techStack: [
        { name: "Rust", section: "language" },
        { name: "Python", section: "language" },
        { name: "PyO3", section: "other" },
        { name: "NumPy", section: "other" },
        { name: "maturin", section: "other" }
      ],
      preview: (
        <PyvolrPerfPreview
          throughputAlt={t("pyvolr.chartAltThroughput")}
          accuracyAlt={t("pyvolr.chartAltAccuracy")}
          throughputCaption={t("pyvolr.chartCaptionThroughput")}
          accuracyCaption={t("pyvolr.chartCaptionAccuracy")}
        />
      ),
      previewPosition: "top",
      link: "https://github.com/yipjunkai/pyvolr",
      linkType: "github"
    },
    {
      name: t("secretsSpotter.name"),
      role: t("secretsSpotter.role"),
      description: t("secretsSpotter.description"),
      bulletPoints: [t("secretsSpotter.bullet1"), t("secretsSpotter.bullet2"), t("secretsSpotter.bullet3")],
      techStack: [
        { name: "Rust", section: "language" },
        { name: "JavaScript", section: "language" },
        { name: "WebAssembly", section: "other" },
        { name: "Chrome Extension", section: "frontend" }
      ],
      preview: <ExtensionPopupPreview />,
      link: "https://github.com/yipjunkai/secrets-spotter",
      linkType: "github"
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{tUI("title")}</h1>
      <section aria-label={tUI("title")} className="flex flex-col gap-16">
        {projects.map((project, index) => (
          <Fragment key={project.name}>
            {index > 0 && <div aria-hidden="true" className="h-px w-full bg-gray-800 dark:bg-neutral-600" />}
            <article className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
              {project.preview && project.previewPosition === "top" && <div className="md:col-span-2">{project.preview}</div>}
              <div
                className={cn(
                  "space-y-4",
                  !project.mobileImage && (!project.preview || project.previewPosition === "top") && "md:col-span-2"
                )}
              >
                <h2 className="text-2xl font-bold">{project.name}</h2>
                {project.description.trim() !== "" && <p className="text-pretty whitespace-pre-wrap">{project.description}</p>}
                {project.link.trim() !== "" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {project.linkType === "github" ? <GithubIcon className="size-6" /> : <GlobeAltIcon className="size-6" />}
                    <span>{project.linkType === "github" ? tUI("labels.github") : tUI("labels.website")}</span>
                  </a>
                )}
                <ul className="list-inside list-disc">
                  {project.bulletPoints.map(bulletPoint => (
                    <li key={bulletPoint} className="text-pretty">
                      {bulletPoint}
                    </li>
                  ))}
                </ul>
                {(() => {
                  const sectionOrder = ["language", "frontend", "backend", "database", "service", "other"] as const;
                  const techSectionLabels: Record<string, string> = {
                    language: tCommon("techSections.language"),
                    frontend: tCommon("techSections.frontend"),
                    backend: tCommon("techSections.backend"),
                    database: tCommon("techSections.database"),
                    service: tCommon("techSections.service"),
                    other: tCommon("techSections.other")
                  };
                  const grouped = Object.groupBy(project.techStack, tech => tech.section);

                  return (
                    <div className="space-y-2">
                      {sectionOrder
                        .filter(section => grouped[section]?.length)
                        .map(section => (
                          <div key={section} className="flex flex-wrap items-center gap-2 lg:gap-4">
                            <span className="w-24 shrink-0 text-sm font-semibold text-muted-foreground">{`${techSectionLabels[section]}:`}</span>
                            {grouped[section]!.map(tech => (
                              <Badge key={tech.name} variant={tech.section as VariantProps<typeof badgeVariants>["variant"]}>
                                {tech.name}
                              </Badge>
                            ))}
                          </div>
                        ))}
                    </div>
                  );
                })()}
              </div>
              {project.preview && project.previewPosition !== "top" && <div>{project.preview}</div>}
              {project.mobileImage && (
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
              )}
              {project.laptopImage && (
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
              )}
            </article>
          </Fragment>
        ))}
      </section>
    </div>
  );
}

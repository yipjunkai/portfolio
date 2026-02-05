import TechStackBubble from "@/components/shared/TechStackBubble";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pages.experience" });

  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function Experience({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experience" });
  const formatter = await getFormatter({ locale });

  const formattedDate = (date: Date) => {
    return formatter.dateTime(date, {
      month: "short",
      year: "numeric"
    });
  };

  const experiences = [
    {
      company: t("jobs.kipo.company"),
      location: t("jobs.kipo.location"),
      position: t("jobs.kipo.position"),
      startDate: new Date(2025, 5, 1), // Jun 2025 (Month is 0-indexed)
      endDate: null, // Present
      techStack: [],
      description: t("jobs.kipo.description"),
      bulletPoints: [t("jobs.kipo.bullet1"), t("jobs.kipo.bullet2"), t("jobs.kipo.bullet3")]
    },
    {
      company: t("jobs.dsbj.company"),
      location: t("jobs.dsbj.location"),
      position: t("jobs.dsbj.position"),
      startDate: new Date(2024, 0, 1), // Jan 2024 (Month is 0-indexed)
      endDate: new Date(2024, 6, 1), // Represents end of June 2024
      techStack: ["Next.js", "NestJS", "FastAPI", "Python", "Typescript", "PostgreSQL"],
      description: t("jobs.dsbj.description"),
      bulletPoints: [t("jobs.dsbj.bullet1"), t("jobs.dsbj.bullet2"), t("jobs.dsbj.bullet3")]
    },
    {
      company: t("jobs.works.company"),
      location: t("jobs.works.location"),
      position: t("jobs.works.position"),
      startDate: new Date(2021, 1, 1), // Feb 2021
      endDate: new Date(2021, 6, 1), // Represents end of June 2021
      techStack: ["Flutter", "Angular", "Dart", "Typescript", "Firebase"],
      description: t("jobs.works.description"),
      bulletPoints: [t("jobs.works.bullet1"), t("jobs.works.bullet2"), t("jobs.works.bullet3")]
    }
  ];

  const research = [
    {
      conference: t("research.ai4x.conference"),
      title: t("research.ai4x.title"),
      contribution: t("contributionLevel.firstAuthor"),
      description: t("research.ai4x.description"),
      abstract: t("research.ai4x.abstract"),
      topics: [t("research.ai4x.topic1"), t("research.ai4x.topic2")],
      link: "https://openreview.net/forum?id=tXJ2G0g9HM"
    }
  ];

  const education = [
    {
      school: t("education.ntu.school"),
      degree: t("education.ntu.degree"),
      description: t("education.ntu.description"),
      bulletPoints: [t("education.ntu.bullet1"), t("education.ntu.bullet2")]
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{t("sections.experience")}</h1>
      <div className="space-y-12">
        {experiences.map(experience => (
          <div key={experience.company} className="space-y-4">
            <div className="flex flex-col justify-between font-mono text-lg md:flex-row">
              <h2 className="truncate">
                {experience.company}
                {" | "}
                {experience.location}
              </h2>
              <p className="tracking-tighter italic">
                {formattedDate(experience.startDate)}
                {" - "}
                {experience.endDate ? formattedDate(experience.endDate) : t("labels.present")}
              </p>
            </div>
            <h1 className="text-2xl font-bold">{experience.position}</h1>
            {experience.description.trim() !== "" && (
              <p className="text-justify text-pretty whitespace-pre-wrap">{experience.description}</p>
            )}
            <ul className="list-inside list-disc">
              {experience.bulletPoints
                .filter(bulletPoint => bulletPoint.trim() !== "")
                .map(bulletPoint => (
                  <li key={bulletPoint} className="text-justify text-pretty">
                    {bulletPoint}
                  </li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {experience.techStack.map(tech => (
                <TechStackBubble key={tech} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="my-12 h-px w-full bg-gray-800 md:my-16 lg:my-20 dark:bg-neutral-600" />
      <h1 className="text-4xl font-bold">{t("sections.research")}</h1>
      <div className="space-y-12">
        {research.map(research => (
          <div key={research.conference} className="space-y-4 lg:space-y-6">
            <h1 className="mb-2 font-mono text-lg lg:mb-4">
              <span>{research.conference}</span>
              {" | "}
              <span className="italic">{research.contribution}</span>
            </h1>
            <h2 className="text-2xl font-bold">{research.title}</h2>
            <p className="text-justify text-pretty whitespace-pre-wrap">{research.description}</p>
            <p className="line-clamp-3 text-justify text-pretty whitespace-pre-wrap italic">
              <span className="mr-4 uppercase">{t("labels.abstract")}</span>
              <span>{research.abstract}</span>
            </p>
            {research.link.trim() !== "" && (
              <div className="flex flex-row items-center gap-2">
                <span>{t("labels.availableAt")} </span>
                <Link
                  href={research.link}
                  target="_blank"
                  className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label={t("aria.linkToPaper")}
                >
                  <DocumentTextIcon className="size-6" />
                  <span>{t("labels.paper")}</span>
                </Link>
              </div>
            )}
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {research.topics.map(topic => (
                <span key={topic} className="rounded-md bg-linear-to-r from-grad-1 to-grad-2 px-2 py-1 text-white">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="my-12 h-px w-full bg-gray-800 md:my-16 lg:my-20 dark:bg-neutral-600" />
      <h1 className="text-4xl font-bold">{t("sections.education")}</h1>
      <div className="space-y-12">
        {education.map(education => (
          <div key={education.school} className="space-y-4">
            <h1 className="flex flex-row items-center gap-2 font-mono text-lg">
              <span>{education.school}</span>
            </h1>
            <h2 className="text-2xl font-bold">{education.degree}</h2>
            {education.description.trim() !== "" && <p className="text-justify text-pretty whitespace-pre-wrap">{education.description}</p>}
            <ul className="list-inside list-disc">
              {education.bulletPoints.map(bulletPoint => (
                <li key={bulletPoint} className="text-justify text-pretty">
                  {bulletPoint}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO: Add dropdown for each experience
// Dropdown show long description

// TODO: (Extra) Make it visually a timeline

// TODO: (Extra) On hover date, show tooltip

// TODO: add pdf viewer for papers

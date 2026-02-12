import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import ExperienceCard from "./_components/ExperienceCard";
import SectionDivider from "./_components/SectionDivider";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

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
      companyUrl: "https://kipo.ai",
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
      companyUrl: "https://www.dsbj.com/",
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
          <ExperienceCard
            key={experience.company}
            header={{
              left: experience.company,
              leftSuffix: ` | ${experience.location}`,
              leftUrl: experience.companyUrl,
              right: (
                <>
                  {formattedDate(experience.startDate)}
                  {" - "}
                  {experience.endDate ? formattedDate(experience.endDate) : t("labels.present")}
                </>
              )
            }}
            title={experience.position}
            description={experience.description}
            bulletPoints={experience.bulletPoints}
            techStack={experience.techStack}
          />
        ))}
      </div>
      <SectionDivider />
      <h1 className="text-4xl font-bold">{t("sections.research")}</h1>
      <div className="space-y-12">
        {research.map(research => (
          <ExperienceCard
            key={research.conference}
            header={{
              left: research.conference,
              leftSuffix: ` | ${research.contribution}`
            }}
            title={research.title}
            description={research.description}
          >
            <p className="line-clamp-3 text-justify text-pretty whitespace-pre-wrap italic">
              <span className="mr-4 uppercase">{t("labels.abstract")}</span>
              <span>{research.abstract}</span>
            </p>
            {research.link.trim() !== "" && (
              <div className="flex flex-row items-center gap-2">
                <span>{t("labels.availableAt")} </span>
                <a
                  href={research.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label={t("aria.linkToPaper")}
                >
                  <DocumentTextIcon className="size-6" />
                  <span>{t("labels.paper")}</span>
                </a>
              </div>
            )}
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {research.topics.map(topic => (
                <span key={topic} className="rounded-md bg-linear-to-r from-grad-1 to-grad-2 px-2 py-1 text-white">
                  {topic}
                </span>
              ))}
            </div>
          </ExperienceCard>
        ))}
      </div>
      <SectionDivider />
      <h1 className="text-4xl font-bold">{t("sections.education")}</h1>
      <div className="space-y-12">
        {education.map(education => (
          <ExperienceCard
            key={education.school}
            header={{
              left: education.school,
              right: <></>
            }}
            title={education.degree}
            description={education.description}
            bulletPoints={education.bulletPoints}
          />
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

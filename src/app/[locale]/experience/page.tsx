import TechStackBubble from "@/components/shared/TechStackBubble";
import { DocumentTextIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export const metadata: Metadata = {
  title: "Experience",
  description: "My education, work and research experience | Computer Engineering (Honours) | SOTA AI research"
};

export default function Experience({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const experiences = [
    {
      company: "DSBJ Pte. Ltd.",
      position: "Application & Data Developer Intern",
      startDate: new Date(2024, 0, 1), // Jan 2024 (Month is 0-indexed)
      endDate: new Date(2024, 6, 1), // Represents end of June 2024
      techStack: ["Next.js", "NestJS", "FastAPI", "Python", "Typescript", "PostgreSQL"],
      description: "",
      bulletPoints: [
        "Implemented a model visualization and analysis platform with Al-driven insights in Python and Nextjs, enabling business units and data scientists to interact with and evaluate mathematical optimization and Al models.",
        "Established a robust Single Sign On (SSO) backend framework, and unified authentication for two existing projects.",
        "Designed an LLM-powered system using LangChain to extract insights from unstructured data."
      ]
    },
    {
      company: "Works Pte. Ltd.",
      position: "Mobile Application & Web Application Developer, Intern",
      startDate: new Date(2021, 1, 1), // Feb 2021
      endDate: new Date(2021, 6, 1), // Represents end of June 2021
      techStack: ["Flutter", "Angular", "Dart", "Typescript", "Firebase"],
      description: "",
      bulletPoints: [
        "Began as a Flutter mobile developer, brought onto Angular web team, and contributed 80% of the total codebase.",
        "Collaborated to create features for both platforms, such as a chat interface, payment processing pages, mobile responsive Ul and other frontend Ul updates, ensuring cross platform feature parity.",
        "Diagnosed and resolved user-reported bugs, eliminating 90% of non-fatal frontend errors in two weeks."
      ]
    }
  ];

  enum ContributionLevel {
    firstAuthor = "First Author",
    coAuthor = "Co-Author",
    presenter = "Presenter"
  }

  const research = [
    {
      conference: "AI4X 2025 International Conference",
      title: "Quantifying Uncertainty in Physics-Informed Neural Networks",
      contribution: ContributionLevel.firstAuthor,
      description:
        "We used deep evidential regression to quantify uncertainties in physics-informed neural networks, demonstrating it on the Burgers and Laplace experiments.",
      abstract:
        "We integrate a state-of-the-art method to quantify aleatoric and epistemic uncertainties in physics-informed neural networks and observe that they can be captured effectively while maintaining predictive accuracy.",
      topics: ["Physics-Informed Neural Networks", "Uncertainty Quantification"],
      link: "https://openreview.net/forum?id=tXJ2G0g9HM"
    }
  ];

  const education = [
    {
      school: "Nanyang Technological University",
      schoolLink: "https://www.ntu.edu.sg/",
      degree: "Bachelor of Engineering (Honours), Computer Engineering",
      description: "",
      bulletPoints: ["Elective Focus in Security & Artificial Intelligence", "Minor in Business"]
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Research</h1>
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
              <span className="mr-4 uppercase">abstract</span>
              <span>{research.abstract}</span>
            </p>
            {research.link.trim() !== "" && (
              <div className="flex flex-row items-center gap-2">
                <span>Avaliable at: </span>
                <Link
                  href={research.link}
                  target="_blank"
                  className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label="Link to paper"
                >
                  <DocumentTextIcon className="size-6" />
                  <span>Paper</span>
                </Link>
              </div>
            )}
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {research.topics.map(topic => (
                <span key={topic} className="rounded-md bg-gradient-to-r from-grad-1 to-grad-2 px-2 py-1 text-white">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="my-12 h-[1px] w-full bg-gray-800 md:my-16 lg:my-20 dark:bg-neutral-600" />
      <h1 className="text-4xl font-bold">Education</h1>
      <div className="space-y-12">
        {education.map(education => (
          <div key={education.school} className="space-y-4">
            <h1 className="flex flex-row items-center gap-2 font-mono text-lg">
              <span>{education.school}</span>
              {" | "}
              <Link
                href={education.schoolLink}
                target="_blank"
                className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                aria-label="Link to school"
              >
                <GlobeAltIcon className="size-6" />
              </Link>
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
      <div className="my-12 h-[1px] w-full bg-gray-800 md:my-16 lg:my-20 dark:bg-neutral-600" />
      <h1 className="text-4xl font-bold">Experience</h1>
      <div className="space-y-12">
        {experiences.map(experience => (
          <div key={experience.company} className="space-y-4">
            <div className="flex flex-col justify-between font-mono text-lg md:flex-row">
              <h2 className="truncate">{experience.company}</h2>
              <p className="tracking-tighter italic">
                {experience.startDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric"
                })}
                {" - "}
                {experience.endDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>
            <h1 className="text-2xl font-bold">{experience.position}</h1>
            {experience.description.trim() !== "" && (
              <p className="text-justify text-pretty whitespace-pre-wrap">{experience.description}</p>
            )}
            <ul className="list-inside list-disc">
              {experience.bulletPoints.map(bulletPoint => (
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
    </div>
  );
}

// TODO: Add dropdown for each experience
// Dropdown show long description

// TODO: (Extra) Make it visually a timeline

// TODO: (Extra) On hover date, show tooltip

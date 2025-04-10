import TechStackBubble from "@/components/shared/TechStackBubble";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Experience() {
  const experiences = [
    {
      company: "DSBJ Pte. Ltd.",
      position: "Application & Data Developer Intern",
      startDate: new Date(2024, 0, 1), // Jan 2024 (Month is 0-indexed)
      endDate: new Date(2024, 6, 1), // Represents end of June 2024
      techStack: [
        "Next.js",
        "NestJS",
        "FastAPI",
        "Python",
        "Typescript",
        "PostgreSQL",
      ],
      description:
        "• Implemented a model visualization and analysis platform with Al-driven insights in Python and Nextjs, enabling business units and data scientists to interact with and evaluate mathematical optimization and Al models.\n• Established a robust Single Sign On (SSO) backend framework, and unified authentication for two existing projects.\n• Designed an LLM-powered system using LangChain to extract insights from unstructured data.",
    },
    {
      company: "Works Pte. Ltd.",
      position: "Mobile Application & Web Application Developer, Intern",
      startDate: new Date(2021, 1, 1), // Feb 2021
      endDate: new Date(2021, 6, 1), // Represents end of June 2021
      techStack: ["Flutter", "Angular", "Dart", "Typescript", "Firebase"],
      description:
        "• Began as a Flutter mobile developer, brought onto Angular web team, and contributed 80% of the total codebase.\n• Collaborated to create features for both platforms, such as a chat interface, payment processing pages, mobile responsive Ul and other frontend Ul updates, ensuring cross platform feature parity.\n• Diagnosed and resolved user-reported bugs, eliminating 90% of non-fatal frontend errors in two weeks.",
    },
  ];

  enum ContributionLevel {
    firstAuthor = "First Author",
    coAuthor = "Co-Author",
    presenter = "Presenter",
  }

  const research = [
    {
      conference: "AI4X 2025, Singapore",
      title: "Quantifying Uncertainty in Physics-Informed Neural Networks",
      contribution: ContributionLevel.firstAuthor,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet repellat consequuntur iusto maxime molestias dolorum, sit numquam rerum dolor perferendis eius est quidem accusantium corrupti at, quis delectus harum commodi!",
      date: new Date(2025, 6, 8),
      topics: [
        "Physics-Informed Neural Networks",
        "Uncertainty Quantification",
      ],
      link: "",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Research</h1>
      <div className="space-y-12">
        {research.map((research) => (
          <div key={research.conference} className="space-y-4 lg:space-y-6">
            <h1 className="font-mono text-lg mb-2 lg:mb-4">
              <span>{research.conference}</span>
              {" | "}
              <span className="italic">{research.contribution}</span>
            </h1>
            <h2 className="text-2xl font-bold">{research.title}</h2>
            <p className="whitespace-pre-wrap text-pretty text-justify">
              {research.description}
            </p>
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {research.topics.map((topic) => (
                <span
                  key={topic}
                  className="from-grad-1 to-grad-2 bg-gradient-to-r px-2 py-1 rounded-md text-white"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="my-12 md:my-16 lg:my-20 w-full h-[1px] bg-gray-800 dark:bg-neutral-600" />
      <h1 className="text-4xl font-bold">Experience</h1>
      <div className="space-y-12">
        {experiences.map((experience) => (
          <div key={experience.company} className="space-y-4">
            <div className="flex flex-row justify-between text-lg font-mono">
              <h2 className="max-w-1/2 md:max-w-2/3 overflow-hidden text-ellipsis whitespace-nowrap">
                {experience.company}
              </h2>
              <p className="tracking-tighter italic">
                {experience.startDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                {" - "}
                {experience.endDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <h1 className="text-2xl font-bold">{experience.position}</h1>
            <p className="whitespace-pre-wrap">{experience.description}</p>
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {experience.techStack.map((tech) => (
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

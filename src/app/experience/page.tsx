import { isDatabase, isProgrammingLanguage } from "@/shared/techStack";

export default function Experience() {
  const experiences = [
    {
      company: "DSBJ Pte. Ltd.",
      position: "Application & Data Developer Intern",
      startDate: new Date(2024, 0, 1), // Jan 2024 (Month is 0-indexed)
      endDate: new Date(2024, 6, 1), // Represents end of June 2024
      techStack: [
        "Nextjs",
        "Nestjs",
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

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Experience</h1>
      <div className="space-y-12">
        {experiences.map((experience) => (
          <div key={experience.company} className="space-y-4">
            <h2 className="font-mono text-lg mb-2">{experience.company}</h2>
            <div className="flex flex-col lg:flex-row justify-between gap-2">
              <p className="dark:text-neutral-400 text-2xl font-bold">
                {experience.position}
              </p>
              <p className="dark:text-neutral-400">
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
            <p className="dark:text-neutral-400 whitespace-pre-wrap break-words">
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`${
                    isProgrammingLanguage(tech)
                      ? "bg-blue-200 dark:bg-blue-800"
                      : isDatabase(tech)
                        ? "bg-green-200 dark:bg-green-800"
                        : "bg-orange-200 dark:bg-orange-800"
                  } px-2 py-1 rounded-md text-sm`}
                >
                  {tech}
                </span>
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

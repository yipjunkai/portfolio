import { Badge, badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

interface CardProps {
  header: {
    left: string;
    leftUrl?: string;
    leftSuffix?: string;
    right?: ReactNode;
  };
  title: string;
  description?: string;
  bulletPoints?: string[];
  techStack?: {
    name: string;
    section: "frontend" | "backend" | "database" | "service" | "language" | "other";
  }[];
  techSectionLabels?: Record<string, string>;
  backgroundGraphic?: ReactNode;
  children?: ReactNode;
}

export default function Card({
  header,
  title,
  description,
  bulletPoints = [],
  techStack = [],
  techSectionLabels = {},
  backgroundGraphic,
  children
}: CardProps) {
  return (
    <article className="relative space-y-4 overflow-hidden lg:space-y-6">
      {backgroundGraphic}
      <div className="flex flex-col justify-between gap-2 font-mono text-lg md:flex-row md:items-center">
        <div className="flex flex-row items-center gap-2">
          <h3 className="truncate">
            {header.leftUrl ? (
              <a
                href={header.leftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {header.left}
              </a>
            ) : (
              header.left
            )}
          </h3>
          {header.leftSuffix && <span className="text-gray-600 dark:text-gray-400">{header.leftSuffix}</span>}
        </div>
        {header.right && <div className="tracking-tighter italic">{header.right}</div>}
      </div>
      <h4 className="text-2xl font-bold">{title}</h4>
      {description && description.trim() !== "" && <p className="text-pretty whitespace-pre-wrap">{description}</p>}
      {bulletPoints.length > 0 && (
        <ul className="list-inside list-disc">
          {bulletPoints
            .filter(point => point.trim() !== "")
            .map(point => (
              <li key={point} className="text-pretty">
                {point}
              </li>
            ))}
        </ul>
      )}
      {children}
      {techStack.length > 0 &&
        (() => {
          const sectionOrder = ["language", "frontend", "backend", "database", "service", "other"] as const;
          const grouped = Object.groupBy(techStack, tech => tech.section);

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
    </article>
  );
}

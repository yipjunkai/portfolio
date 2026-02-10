import TechStackBubble from "@/components/shared/TechStackBubble";
import { ReactNode } from "react";

interface CardProps {
  header: {
    left: string;
    right?: ReactNode;
  };
  title: string;
  description?: string;
  bulletPoints?: string[];
  techStack?: string[];
  children?: ReactNode;
}

export default function Card({ header, title, description, bulletPoints = [], techStack = [], children }: CardProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col justify-between gap-2 font-mono text-lg md:flex-row md:items-center">
        <h2 className="truncate">{header.left}</h2>
        {header.right && <div className="tracking-tighter italic">{header.right}</div>}
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
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
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 lg:gap-4">
          {techStack.map(tech => (
            <TechStackBubble key={tech} tech={tech} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TechStackBubble({ tech }: { tech: string }) {
  const programmingLanguages = [
    "Python",
    "Typescript",
    "Dart",
    "Java",
    "Javascript",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Ruby",
    "PHP",
    "C",
    "C#",
    "C++",
    "Java",
  ];

  const backendFrameworks = [
    "NestJS",
    "FastAPI",
    "Django",
    "Flask",
    "Express",
    "Strapi",
  ];

  const databases = [
    "PostgreSQL",
    "Firebase",
    "MySQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "MariaDB",
  ];

  const services = [
    "Stripe",
    "AWS",
    "Azure",
    "Google Cloud",
    "Heroku",
    "Vercel",
    "Cloudflare",
    "Digital Ocean",
    "Linode",
    "Vercel",
  ];

  const isOfType = (tech: string) => {
    if (programmingLanguages.includes(tech)) {
      return "bg-blue-200 dark:bg-blue-800";
    } else if (databases.includes(tech)) {
      return "bg-green-200 dark:bg-green-800";
    } else if (backendFrameworks.includes(tech)) {
      return "bg-purple-200 dark:bg-purple-800";
    } else if (services.includes(tech)) {
      return "bg-yellow-200 dark:bg-yellow-800";
    } else {
      return "bg-orange-200 dark:bg-orange-800";
    }
  };

  return (
    <span className={`${isOfType(tech)} px-2 py-1 rounded-md text-sm`}>
      {tech}
    </span>
  );
}

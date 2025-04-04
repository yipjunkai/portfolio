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

const databases = [
  "PostgreSQL",
  "Firebase",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "MariaDB",
];

export const isProgrammingLanguage = (tech: string) => {
  return programmingLanguages.includes(tech);
};

export const isDatabase = (tech: string) => {
  return databases.includes(tech);
};

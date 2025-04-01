export default function Experience() {
  const experiences = [
    {
      company: "Google",
      position: "Software Engineer",
      startDate: new Date(2020, 0, 1),
      endDate: new Date(2021, 0, 1),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      company: "Facebook",
      position: "Software Engineer",
      startDate: new Date(2021, 0, 1),
      endDate: new Date(2022, 0, 1),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      company: "Twitter",
      position: "Software Engineer",
      startDate: new Date(2022, 0, 1),
      endDate: new Date(2023, 0, 1),
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Experience</h1>
      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <div key={experience.company} className="space-y-2">
            <h2 className="text-2xl font-bold">{experience.company}</h2>
            <div className="flex flex-row justify-between">
              <p className="text-neutral-400">{experience.position}</p>
              <p className="text-neutral-400">
                {experience.startDate.toLocaleDateString()}
                {" - "}
                {experience.endDate.toLocaleDateString()}
              </p>
            </div>

            <p className="text-sm text-neutral-400 whitespace-pre-wrap break-words">
              {experience.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

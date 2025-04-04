import TechStackBubble from "@/components/shared/TechStackBubble";
import LaptopTemplate from "./_components/LaptopTemplate";
import MobileTemplate from "./_components/MobileTemplate";
import Image from "next/image";
import oceanfrontHardwareLaptop from "./_assets/oceanfront-hardware-laptop.webp";
import oceanfrontHardwareMobile from "./_assets/oceanfront-hardware-mobile.webp";

export default function Projects() {
  const projects = [
    {
      name: "Oceanfront Hardware",
      role: "Developer",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolor error totam dolores dolorem labore distinctio necessitatibus molestias. Iure architecto assumenda quod voluptatum voluptas nemo molestias suscipit, cum deleniti veritatis.\n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolor error totam dolores dolorem labore distinctio necessitatibus molestias. Iure architecto assumenda quod voluptatum voluptas nemo molestias suscipit, cum deleniti veritatis.",
      techStack: ["Nuxt", "TypeScript", "Strapi", "Stripe"],
      laptopImage: oceanfrontHardwareLaptop,
      mobileImage: oceanfrontHardwareMobile,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="dark:text-neutral-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos,
        assumenda eum tempore reprehenderit libero asperiores rerum odio
        quibusdam deserunt, est repellat ducimus commodi nemo tenetur similique
        iure esse explicabo unde.
      </div>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <p className="dark:text-neutral-400 whitespace-pre-wrap overflow-hidden">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechStackBubble key={tech} tech={tech} />
                ))}
              </div>
            </div>
            <MobileTemplate>
              <Image
                src={project.mobileImage}
                alt={project.name}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%",
                }}
              />
            </MobileTemplate>
            <LaptopTemplate className="md:col-span-2">
              <Image
                src={project.laptopImage}
                alt={project.name}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%",
                }}
              />
            </LaptopTemplate>
          </div>
        ))}
      </div>
    </div>
  );
}

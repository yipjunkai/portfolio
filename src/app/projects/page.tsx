import TechStackBubble from "@/components/shared/TechStackBubble";
import LaptopTemplate from "./_components/LaptopTemplate";
import MobileTemplate from "./_components/MobileTemplate";
import Image from "next/image";
import oceanfrontHardwareLaptop from "./_assets/oceanfront-hardware-laptop.webp";
import oceanfrontHardwareMobile from "./_assets/oceanfront-hardware-mobile.webp";
import ImageCarousel from "./_components/ImageCarousel";

export default function Projects() {
  const projects = [
    {
      name: "Oceanfront Hardware",
      role: "Developer",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolor error totam dolores dolorem labore distinctio necessitatibus molestias. \n\nIure architecto assumenda quod voluptatum voluptas nemo molestias suscipit, cum deleniti veritatis.",
      bulletPoints: [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolor error totam dolores dolorem labore distinctio necessitatibus molestias. Iure architecto assumenda quod voluptatum voluptas nemo molestias suscipit, cum deleniti veritatis.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolor errasdasdasdads or totam dolores dolorem labore distinctio necessitatibus molestias. Iure architecto assumenda quod voluptatum voluptas nemo molestias suscipit, cum deleniti veritatis.",
      ],
      techStack: ["Nuxt", "TypeScript", "Strapi", "Stripe"],
      laptopImage: {
        src: oceanfrontHardwareLaptop,
        alt: "OceanfrontHardware desktop view",
      },
      mobileImage: {
        src: oceanfrontHardwareMobile,
        alt: "OceanfrontHardware mobile view",
      },
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="text-pretty text-justify">
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
              <p className="whitespace-pre-wrap text-pretty text-justify">
                {project.description}
              </p>
              <ul className="list-disc list-inside">
                {project.bulletPoints.map((bulletPoint) => (
                  <li key={bulletPoint} className="text-pretty text-justify">
                    {bulletPoint}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechStackBubble key={tech} tech={tech} />
                ))}
              </div>
            </div>
            <MobileTemplate className="hidden md:block">
              <Image
                src={project.mobileImage.src}
                alt={project.mobileImage.alt}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%",
                }}
              />
            </MobileTemplate>
            <LaptopTemplate className="md:col-span-2 hidden md:block">
              <Image
                src={project.laptopImage.src}
                alt={project.laptopImage.alt}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%",
                }}
              />
            </LaptopTemplate>
            <ImageCarousel
              images={[project.mobileImage, project.laptopImage]}
              className="md:hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

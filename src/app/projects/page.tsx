import TechStackBubble from "@/components/shared/TechStackBubble";
import LaptopTemplate from "./_components/LaptopTemplate";
import MobileTemplate from "./_components/MobileTemplate";
import Image from "next/image";
import oceanfrontHardwareLaptop from "./_assets/oceanfront-hardware-laptop.webp";
import oceanfrontHardwareMobile from "./_assets/oceanfront-hardware-mobile.webp";
import ImageCarousel from "./_components/ImageCarousel";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Professional and freelance projects, outside of work | Web developer, AI/ML",
};

export default function Projects() {
  const projects = [
    {
      name: "Oceanfront Hardware",
      role: "Developer",
      description:
        "Freelanced as a full-stack web developer for this hardware company. Focused on SEO performance and CMS integration.",
      bulletPoints: [
        "Developed a company website with e-commerce functionality in two months using Vue.js (Vite), and Strapi CMS, with Stripe for payment processing",
        "Adopted Meilisearch to upgrade search functionality, reducing query response time from 700ms to 20ms",
        "Migrated frontend to Nuxtjs, leveraged server-side rendering (SSR) enhancing SEO and page load speed to 800ms",
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
      link: "https://oceanfronthardware.com.sg/",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              {project.description.trim() !== "" && (
                <p className="whitespace-pre-wrap text-pretty text-justify">
                  {project.description}
                </p>
              )}
              {project.link.trim() !== "" && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 underline flex flex-row items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <GlobeAltIcon className="size-6" />
                  <span>Website</span>
                </Link>
              )}
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

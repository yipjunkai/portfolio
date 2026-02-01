import TechStackBubble from "@/components/shared/TechStackBubble";
import LaptopTemplate from "./_components/LaptopTemplate";
import MobileTemplate from "./_components/MobileTemplate";
import Image from "next/image";
import oceanfrontHardwareLaptop from "./_assets/oceanfront-hardware-laptop.webp";
import oceanfrontHardwareMobile from "./_assets/oceanfront-hardware-mobile.webp";
import ImageCarousel from "./_components/ImageCarousel";
import { Link } from "@/i18n/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Professional and freelance projects, outside of work | Web developer, AI/ML"
};

export default function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const projects = [
    {
      name: "Oceanfront Hardware",
      role: "Developer",
      description: "Freelanced as a full-stack web developer for this hardware company. Focused on SEO performance and CMS integration.",
      bulletPoints: [
        "Developed a company website with e-commerce functionality in two months using Vue.js (Vite), and Strapi CMS, with Stripe for payment processing",
        "Adopted Meilisearch to upgrade search functionality, reducing query response time from 700ms to 20ms",
        "Migrated frontend to Nuxtjs, leveraged server-side rendering (SSR) enhancing SEO and page load speed to 800ms"
      ],
      techStack: ["Nuxt", "Typescript", "Strapi", "Stripe"],
      laptopImage: {
        src: oceanfrontHardwareLaptop,
        alt: "OceanfrontHardware desktop view"
      },
      mobileImage: {
        src: oceanfrontHardwareMobile,
        alt: "OceanfrontHardware mobile view"
      },
      link: "https://oceanfronthardware.com.sg/"
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="flex flex-col gap-4">
        {projects.map(project => (
          <div key={project.name} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              {project.description.trim() !== "" && <p className="text-justify text-pretty whitespace-pre-wrap">{project.description}</p>}
              {project.link.trim() !== "" && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex flex-row items-center gap-1 text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <GlobeAltIcon className="size-6" />
                  <span>Website</span>
                </Link>
              )}
              <ul className="list-inside list-disc">
                {project.bulletPoints.map(bulletPoint => (
                  <li key={bulletPoint} className="text-justify text-pretty">
                    {bulletPoint}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
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
                  objectPosition: "50% 0%"
                }}
              />
            </MobileTemplate>
            <LaptopTemplate className="hidden md:col-span-2 md:block">
              <Image
                src={project.laptopImage.src}
                alt={project.laptopImage.alt}
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 0%"
                }}
              />
            </LaptopTemplate>
            <ImageCarousel images={[project.mobileImage, project.laptopImage]} className="md:hidden" />
          </div>
        ))}
      </div>
    </div>
  );
}

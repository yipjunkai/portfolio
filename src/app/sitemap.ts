import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yipjunkai.com",
      lastModified: new Date(),
    },
    {
      url: "https://yipjunkai.com/experience",
      lastModified: new Date(),
    },
    {
      url: "https://yipjunkai.com/projects",
      lastModified: new Date(),
    },
  ];
}

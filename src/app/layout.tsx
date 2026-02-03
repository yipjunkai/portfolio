import { Metadata } from "next";
import React from "react";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url)
};

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

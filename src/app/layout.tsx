import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yipjunkai.com")
};

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

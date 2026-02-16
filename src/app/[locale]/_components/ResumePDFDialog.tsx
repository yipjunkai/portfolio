"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config";

const PDFDialogContent = dynamic(() => import("@/components/ui/pdf-dialog-content"), {
  ssr: false
});

export default function PDFDialog({ children }: { children: ReactNode }) {
  const t = useTranslations("common.home.cvDialog");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <PDFDialogContent
        url={siteConfig.resume.url}
        downloadName={t("filename")}
        title={t("title")}
        description={t("description")}
      />
    </Dialog>
  );
}

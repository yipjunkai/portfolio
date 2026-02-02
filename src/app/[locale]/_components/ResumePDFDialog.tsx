"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

const CV_URL = "https://umpsbusvwgpktceb.public.blob.vercel-storage.com/resume-ozfP9vT12y8ThPw55957KAH0yJwNfK.pdf";

const PDFDialogContent = dynamic(() => import("@/components/ui/pdf-dialog-content"), {
  ssr: false
});

export default function PDFDialog({ children }: { children: ReactNode }) {
  const t = useTranslations("home");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <PDFDialogContent
        url={CV_URL}
        downloadName={`${t("resume-file-name")}.pdf`}
        title={t("download-cv-title")}
        description={t("download-cv-description")}
      />
    </Dialog>
  );
}

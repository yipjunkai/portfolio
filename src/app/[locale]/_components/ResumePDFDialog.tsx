"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PDFDialogContent from "@/components/ui/pdf-dialog-content";
import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config";

export default function PDFDialog({ children }: { children: ReactNode }) {
  const t = useTranslations("common.home.cvDialog");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {/* Mount the pdfjs subtree only after opening to avoid a prerendered client-only boundary
          between hero triggers. Recovering that boundary can remove both triggers during hydration. */}
      {open && (
        <PDFDialogContent url={siteConfig.resume.url} downloadName={t("filename")} title={t("title")} description={t("description")} />
      )}
    </Dialog>
  );
}

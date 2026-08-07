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
      {/*
        Mounted only once opened. The dialog content subtree is client-only (it loads pdfjs),
        and a client-only subtree rendered unconditionally here would be prerendered as a
        *failed* Suspense boundary — `BAILOUT_TO_CLIENT_SIDE_RENDERING` baked into the static
        HTML between this trigger and the one beside it. Recovering that boundary during
        hydration could take both triggers with it, leaving the hero with no call to action.
        Gating on `open` keeps the prerendered tree to just the trigger, so there is no
        boundary to recover and nothing to lose.
      */}
      {open && (
        <PDFDialogContent url={siteConfig.resume.url} downloadName={t("filename")} title={t("title")} description={t("description")} />
      )}
    </Dialog>
  );
}

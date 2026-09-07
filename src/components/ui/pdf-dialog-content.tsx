"use client";

import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "./button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

// Keep dialog chrome interactive while the client-only pdfjs viewer loads.
const PdfViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => <div className="h-[60vh] animate-pulse border bg-muted motion-reduce:animate-none" />
});

export interface PDFDialogContentProps {
  url: string;
  title: string;
  description: string;
  downloadName?: string;
}

export default function PDFDialogContent({ url, downloadName, title, description }: PDFDialogContentProps) {
  const t = useTranslations("common");
  const [downloadFailed, setDownloadFailed] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Browsers ignore cross-origin download names; fetch the Blob before triggering the download.
  const downloadPDF = async () => {
    setDownloading(true);
    setDownloadFailed(false);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Resume request failed: ${response.status}`);

      const blobUrl = window.URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = downloadName ?? "resume.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      setDownloadFailed(true);
    } finally {
      setDownloading(false);
    }
  };

  // The viewer sizes pages from this container; content-driven width would collapse the dialog.
  return (
    <DialogContent className="top-0 left-0 flex h-svh w-full max-w-full translate-0 flex-col rounded-none p-4 sm:top-[50%] sm:left-[50%] sm:h-auto sm:w-full sm:max-w-5xl sm:translate-[-50%] sm:rounded-lg sm:p-6">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <PdfViewer url={url} loadingLabel={t("home.cvDialog.loading")} errorLabel={t("home.cvDialog.loadError")} />

      <DialogFooter className="sm:items-center">
        {downloadFailed && (
          <p role="alert" className="text-sm text-muted-foreground sm:mr-auto">
            {t("home.cvDialog.downloadError")}
          </p>
        )}
        <Button variant="secondary" disabled={downloading} onClick={downloadPDF}>
          <ArrowDownTrayIcon className="size-6" />
          <span>{downloadFailed ? t("error.retry") : t("download")}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

"use client";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { Button } from "./button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface Props {
  url: string;
  title: string;
  description: string;
  downloadName?: string;
}

export default function PDFDialog({ url, downloadName, title, description, children }: Props & { children: React.ReactNode }) {
  const t = useTranslations("pdf-dialog");

  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Client side download function to avoid CORS issues
  const downloadPDF = async (url: string, downloadName: string) => {
    // Fetch the PDF file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }
    const blob = await response.blob();

    // Create a blob URL and trigger a download
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = downloadName;
    a.click();

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
    a.remove();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!top-0 !left-0 flex !h-[100dvh] !w-full !max-w-full !translate-x-0 !translate-y-0 flex-col !rounded-none !p-4 sm:!top-[50%] sm:!left-[50%] sm:!h-auto sm:!w-auto sm:!max-w-3xl sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:!rounded-lg sm:!p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto border sm:max-h-[70vh] sm:flex-none dark:border-0">
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages }, (_, index) => (
              <Page key={`page-${index + 1}`} pageNumber={index + 1} width={718} />
            ))}
          </Document>
        </div>

        {/* Download button */}
        <DialogFooter>
          <Button variant="secondary" className="mt-4" onClick={() => downloadPDF(url, downloadName ?? "download.pdf")}>
            <ArrowDownTrayIcon className="size-6" />
            <span>{t("download")}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { Button } from "./button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Link } from "@/i18n/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

interface Props {
  url: string;
}

export default function PDFDialog({ url, children }: Props & { children: React.ReactNode }) {
  const t = useTranslations("pdf-dialog");

  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl!">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages }, (_, index) => (
              <Page key={`page-${index + 1}`} pageNumber={index + 1} width={718} />
            ))}
          </Document>
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages }, (_, index) => (
              <Page key={`page-${index + 1}`} pageNumber={index + 1} width={718} />
            ))}
          </Document>
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages }, (_, index) => (
              <Page key={`page-${index + 1}`} pageNumber={index + 1} width={718} />
            ))}
          </Document>
        </div>

        {/* Download button */}
        <DialogFooter>
          <Button variant="secondary" className="mt-4" asChild>
            <Link href={url}>
              <ArrowDownTrayIcon className="size-6" />
              <span>{t("download")}</span>
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

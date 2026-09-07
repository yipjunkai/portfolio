"use client";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";

// `new URL(..., import.meta.url)` lets Turbopack emit react-pdf's worker asset. pnpm hoists
// pdfjs-dist through `publicHoistPattern` because it is react-pdf's transitive dependency.
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export interface PdfViewerProps {
  url: string;
  loadingLabel: string;
  errorLabel: string;
}

// Preserve readable resume text on narrow viewports; horizontal panning is preferable to shrinking.
const MIN_READABLE_WIDTH = 960;

function Notice({ children }: { children: string }) {
  return <p className="p-8 text-center text-sm text-muted-foreground">{children}</p>;
}

export default function PdfViewer({ url, loadingLabel, errorLabel }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Ignore transient and unchanged measurements: each accepted width re-rasterizes every page.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const measured = Math.max(Math.round(entry.contentRect.width), MIN_READABLE_WIDTH);
      if (measured > 0) setWidth(current => (current === measured ? current : measured));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    // Fill the full-height mobile dialog; constrain the auto-height desktop dialog.
    <div ref={containerRef} className="min-h-0 flex-1 overflow-auto border sm:max-h-[70vh] sm:flex-none">
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<Notice>{loadingLabel}</Notice>}
        error={<Notice>{errorLabel}</Notice>}
        noData={<Notice>{errorLabel}</Notice>}
      >
        {width !== undefined &&
          Array.from({ length: numPages }, (_, index) => <Page key={`page-${index + 1}`} pageNumber={index + 1} width={width} />)}
      </Document>
    </div>
  );
}

"use client";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";

// react-pdf ships a placeholder workerSrc ("pdf.worker.mjs") that never resolves under a
// bundler, so it has to be pointed at the real file. `new URL(..., import.meta.url)` is the
// method react-pdf documents: Turbopack rewrites it into an emitted asset rather than
// resolving it at runtime. It reaches pdfjs-dist through the `publicHoistPattern` entry in
// pnpm-workspace.yaml, which pnpm needs because pdfjs-dist is react-pdf's dependency and not
// ours. This is the only module in the app that touches pdfjs, and it is never imported on
// the server — see pdf-dialog-content.tsx for how it is loaded.
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export interface PdfViewerProps {
  url: string;
  loadingLabel: string;
  errorLabel: string;
}

// A resume is dense enough that fitting a page to a phone's width renders it unreadable, and
// the reader has to zoom in regardless. So pages never render narrower than this: on a phone
// the document opens already legible and pans sideways, which is the behaviour to preserve.
const MIN_READABLE_WIDTH = 960;

function Notice({ children }: { children: string }) {
  return <p className="p-8 text-center text-sm text-muted-foreground">{children}</p>;
}

export default function PdfViewer({ url, loadingLabel, errorLabel }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Widen pages to fill a container bigger than the readable baseline, never shrink below it.
  // Zero and unchanged widths are dropped because every accepted width re-rasterises every
  // page: the observer can report a transient 0 while the dialog is still laying out, and
  // sub-pixel jitter would otherwise thrash it.
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
    // `flex-1 min-h-0` so the viewer fills the full-height mobile dialog rather than stopping
    // at content height and leaving a gap above the footer. On sm+ the dialog is auto-height,
    // so it goes back to sizing to content under the 70vh cap.
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

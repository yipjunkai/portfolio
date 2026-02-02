"use client";

import dynamic from "next/dynamic";

const PDFDialog = dynamic(() => import("@/components/ui/pdf-dialog"), {
  ssr: false,
  loading: () => null
});

export default PDFDialog;

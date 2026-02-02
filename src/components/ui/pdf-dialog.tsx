"use client";

import dynamic from "next/dynamic";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { PDFDialogContentProps } from "@/components/ui/pdf-dialog-content";
import type { ReactNode } from "react";

// Only lazy-load the heavy PDF content, not the trigger button
const PDFDialogContent = dynamic(() => import("@/components/ui/pdf-dialog-content"), {
  ssr: false
});

interface Props extends PDFDialogContentProps {
  children: ReactNode;
}

export default function PDFDialog({ children, ...contentProps }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <PDFDialogContent {...contentProps} />
    </Dialog>
  );
}

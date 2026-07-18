"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";
import { siteConfig } from "@/config";

const EmailActions = ({ email }: { email: string }) => {
  const t = useTranslations("common.home.emailDialog");
  const [isCopied, setIsCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setCopyCount(c => c + 1);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Option 1: Open email client */}
      <div className="flex flex-col gap-1">
        <Button variant="secondary" asChild className="w-full">
          <a href={`mailto:${email}`}>
            <MailIcon className="size-4" />
            <span>{t("openEmailClient")}</span>
          </a>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t("orCopyEmail")}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Option 2: Copy email */}
      <div className="flex flex-col gap-1">
        <div className="relative flex flex-row items-center justify-between overflow-hidden rounded-md bg-gray-100 py-2 pr-2 pl-4 dark:bg-gray-800">
          {copyCount > 0 && (
            <span
              key={copyCount}
              aria-hidden
              className="animate-copy-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent motion-reduce:hidden dark:via-white/15"
            />
          )}
          <pre className="font-mono text-sm tracking-wider whitespace-pre-wrap">{email}</pre>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handleCopy}
            aria-label={t("copyEmail")}
            title={t("copyEmail")}
          >
            <CopyIcon className={`absolute size-4 transition-opacity duration-200 ease-in-out ${isCopied ? "opacity-0" : "opacity-100"}`} />
            <CheckIcon
              className={`absolute size-4 transition-opacity duration-200 ease-in-out ${isCopied ? "opacity-100" : "opacity-0"}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function EmailMeDialog({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common.home.emailDialog");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <EmailActions email={siteConfig.email} />
      </DialogContent>
    </Dialog>
  );
}

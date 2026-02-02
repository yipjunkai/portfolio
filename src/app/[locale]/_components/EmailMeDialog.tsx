"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";

const EMAIL = "hello@yipjunkai.com";

const EmailActions = ({ email }: { email: string }) => {
  const t = useTranslations("email");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
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
            <span>{t("open-email-client")}</span>
          </a>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t("or")}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Option 2: Copy email */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between rounded-md bg-gray-100 py-2 pr-2 pl-4 dark:bg-gray-800">
          <pre className="font-mono text-sm tracking-wider whitespace-pre-wrap">{email}</pre>
          <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700" onClick={handleCopy}>
            <CopyIcon
              className={`absolute size-4 opacity-0 transition-opacity duration-200 ease-in-out ${isCopied ? "" : "opacity-100"}`}
            />
            <CheckIcon
              className={`absolute size-4 opacity-0 transition-opacity duration-200 ease-in-out ${isCopied ? "opacity-100" : ""}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function EmailMeDialog({ children }: { children: React.ReactNode }) {
  const t = useTranslations("email");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <EmailActions email={EMAIL} />
      </DialogContent>
    </Dialog>
  );
}

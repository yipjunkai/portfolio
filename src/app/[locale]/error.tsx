"use client";

import { ArrowPathIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("common.error");

  return (
    <div className="flex h-4/5 flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="text-center text-pretty text-muted-foreground">{t("description")}</p>
      <div className="flex flex-col gap-3 pt-8 sm:flex-row">
        <Button variant="default" onClick={reset}>
          <ArrowPathIcon className="size-5" />
          <span>{t("retry")}</span>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/">
            <HomeIcon className="size-5" />
            <span>{t("goHome")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

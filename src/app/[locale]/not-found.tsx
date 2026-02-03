import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import undrawVibeCoding from "./_assets/undraw_vibe-coding_mjme.svg";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex h-4/5 flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <Image src={undrawVibeCoding} alt={t("illustrationAlt")} className="size-60" />
      <Button variant="default" asChild className="mt-32 md:mt-20">
        <Link href="/">
          <HomeIcon className="size-6" />
          <span>{t("goHome")}</span>
        </Link>
      </Button>
    </div>
  );
}

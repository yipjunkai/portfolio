import React, { ButtonHTMLAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LanguageIcon } from "@heroicons/react/24/solid";
import { cn } from "@/components/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageChanger({ className, style }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const languages: {
    name: string;
    code: string;
    icon: React.ReactNode;
  }[] = [
    {
      name: "English (Singapore)",
      code: "en-SG",
      icon: <span className="text-2xl">🇸🇬</span>
    },
    {
      name: "简体中文",
      code: "zh-SG",
      icon: <span className="text-2xl">🇨🇳</span>
    }
  ];

  if (languages.length === 1) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn("flex items-center gap-2", className)} style={style} size="icon-lg">
          <LanguageIcon className="size-6 lg:size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={locale}>
            {languages.map(language => (
              <DropdownMenuRadioItem
                key={language.code}
                value={language.code}
                onClick={() => router.push(pathname, { locale: language.code })}
              >
                {language.icon}
                {language.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

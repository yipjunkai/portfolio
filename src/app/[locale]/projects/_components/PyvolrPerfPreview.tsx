import Image from "next/image";
import perfLight from "../_assets/pyvolr-perf-light.svg";
import perfDark from "../_assets/pyvolr-perf-dark.svg";
import { cn } from "@/components/lib/utils";

export default function PyvolrPerfPreview({ alt, className }: { alt: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-2xl ring-1 ring-black/5 dark:border-neutral-700 dark:bg-neutral-900 dark:ring-white/5">
        <Image
          src={perfLight}
          alt={alt}
          unoptimized
          className="block h-auto w-full dark:hidden"
        />
        <Image
          src={perfDark}
          alt={alt}
          unoptimized
          className="hidden h-auto w-full dark:block"
        />
      </div>
    </div>
  );
}

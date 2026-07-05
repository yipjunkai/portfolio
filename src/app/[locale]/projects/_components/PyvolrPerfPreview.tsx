import Image from "next/image";
import throughputLight from "../_assets/pyvolr-throughput-light.svg";
import throughputDark from "../_assets/pyvolr-throughput-dark.svg";
import accuracyLight from "../_assets/pyvolr-accuracy-light.svg";
import accuracyDark from "../_assets/pyvolr-accuracy-dark.svg";
import { cn } from "@/components/lib/utils";

interface ChartProps {
  light: typeof throughputLight;
  dark: typeof throughputDark;
  alt: string;
  caption: string;
}

function Chart({ light, dark, alt, caption }: ChartProps) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={light}
        alt={alt}
        unoptimized
        className="block h-auto w-full dark:hidden"
      />
      <Image
        src={dark}
        alt={alt}
        unoptimized
        className="hidden h-auto w-full dark:block"
      />
      <figcaption className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function PyvolrPerfPreview({
  throughputAlt,
  accuracyAlt,
  throughputCaption,
  accuracyCaption,
  className,
}: {
  throughputAlt: string;
  accuracyAlt: string;
  throughputCaption: string;
  accuracyCaption: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="grid w-full grid-cols-1 items-start gap-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-2xl ring-1 ring-black/5 xl:grid-cols-2 dark:border-neutral-700 dark:bg-neutral-900 dark:ring-white/5">
        <Chart
          light={throughputLight}
          dark={throughputDark}
          alt={throughputAlt}
          caption={throughputCaption}
        />
        <Chart
          light={accuracyLight}
          dark={accuracyDark}
          alt={accuracyAlt}
          caption={accuracyCaption}
        />
      </div>
    </div>
  );
}

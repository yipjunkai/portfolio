import type { ReactNode } from "react";
import { ExclamationTriangleIcon, InformationCircleIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import { cn } from "@/components/lib/utils";

type CalloutType = "info" | "warning" | "tip";

const CONFIG: Record<CalloutType, { icon: typeof InformationCircleIcon; className: string; iconClassName: string }> = {
  info: {
    icon: InformationCircleIcon,
    className: "border-blue-500/30 bg-blue-500/10",
    iconClassName: "text-blue-600 dark:text-blue-400"
  },
  warning: {
    icon: ExclamationTriangleIcon,
    className: "border-yellow-500/40 bg-yellow-500/10",
    iconClassName: "text-yellow-600 dark:text-yellow-400"
  },
  tip: {
    icon: LightBulbIcon,
    className: "border-green-500/30 bg-green-500/10",
    iconClassName: "text-green-600 dark:text-green-400"
  }
};

/** Reusable admonition for MDX posts: <Callout type="warning" title="…">…</Callout> */
export function Callout({ type = "info", title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
  const { icon: Icon, className, iconClassName } = CONFIG[type];

  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-lg border p-4", className)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconClassName)} />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm text-pretty [&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
      </div>
    </div>
  );
}

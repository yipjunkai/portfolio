import { cn } from "@/components/lib/utils";

const JWT_TOKEN_PREVIEW = "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...";
const JWT_HEADER = `{
  "alg": "HS256",
  "typ": "JWT"
}`;
const JWT_PAYLOAD = `{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`;
const POSTHOG_API_KEY_PREVIEW = "phc_SrqtLbDe...";

export default function ExtensionPopupPreview({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-2xl ring-1 ring-black/5 md:w-[320px] dark:border-neutral-700 dark:bg-neutral-900 dark:ring-white/5">
        <h3 className="mb-1 text-base font-bold text-neutral-900 dark:text-white">Secrets Spotter</h3>
        <div className="text-[11px] font-medium text-orange-500">
          Scanning page<span className="inline-block w-3 text-left">...</span>
        </div>
        <div className="mt-1 mb-3 text-[11px] text-neutral-500 dark:text-neutral-400">
          86 scanned, 0 skipped (cookie: 6, dom: 15, fetch: 65)
        </div>

        <div className="mb-3 rounded-sm border border-neutral-200 bg-white px-2 py-2 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="text-[12px] font-bold text-neutral-800 dark:text-neutral-200">2 secret(s) detected</div>
          <div className="mt-0.5 text-[12px]">
            <span className="font-bold text-orange-500">High: 1</span>
            <span className="mx-1 text-neutral-400 dark:text-neutral-500">|</span>
            <span className="font-bold text-amber-500">Medium: 1</span>
          </div>
        </div>

        <div className="mb-1 rounded-sm border-l-[3px] border-orange-500 bg-white px-2 py-2 dark:bg-neutral-800">
          <div className="flex items-center gap-2 text-[12px]">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">JWT Token</span>
            <span className="text-[10px] font-normal text-neutral-400 dark:text-neutral-500">[DOM]</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <code className="flex-1 overflow-hidden rounded-xs bg-neutral-100 px-1.5 py-2.5 font-mono text-[10px] whitespace-nowrap text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              {JWT_TOKEN_PREVIEW}
            </code>
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="shrink-0 rounded-xs border border-neutral-300 bg-white px-2 py-0.5 text-[10px] text-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
            >
              Copy
            </button>
          </div>
          <div className="mt-1.5 rounded-xs border border-neutral-200 bg-neutral-50 p-1.5 dark:border-neutral-700 dark:bg-neutral-900/60">
            <div className="text-[11px] text-neutral-600 dark:text-neutral-400">
              <span aria-hidden="true">▾</span> JWT decode
            </div>
            <pre className="mt-1 overflow-x-auto rounded-xs bg-neutral-100 px-1.5 py-1.5 font-mono text-[9px] leading-snug text-neutral-700 dark:bg-neutral-950 dark:text-neutral-400">
              {JWT_HEADER}
            </pre>
            <pre className="mt-1 overflow-x-auto rounded-xs bg-neutral-100 px-1.5 py-1.5 font-mono text-[9px] leading-snug text-neutral-700 dark:bg-neutral-950 dark:text-neutral-400">
              {JWT_PAYLOAD}
            </pre>
          </div>
        </div>

        <div className="rounded-sm border-l-[3px] border-amber-500 bg-white px-2 py-2 dark:bg-neutral-800">
          <div className="flex items-center gap-2 text-[12px]">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">PostHog API Key</span>
            <span className="text-[10px] font-normal text-neutral-400 dark:text-neutral-500">[DOM]</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <code className="flex-1 overflow-hidden rounded-xs bg-neutral-100 px-1.5 py-2.5 font-mono text-[10px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              {POSTHOG_API_KEY_PREVIEW}
            </code>
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="shrink-0 rounded-xs border border-neutral-300 bg-white px-2 py-0.5 text-[10px] text-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-3 border-t border-neutral-200 pt-2 text-[11px] text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
          <span aria-hidden="true">▸</span> Debug Log
        </div>
      </div>
    </div>
  );
}

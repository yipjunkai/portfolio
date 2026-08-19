import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

// Each row is one artifact the reader can open. Mono names the thing (orientation),
// sans carries the claim — the same register split the experience entries use. The link
// colour is deliberately the blue used for outbound links elsewhere, not the brand
// gradient: an outbound link is not a brand moment.
const ROWS = [
  { key: "pyvolr", href: "https://github.com/yipjunkai/pyvolr", external: true },
  { key: "secretsSpotter", href: "https://github.com/yipjunkai/secrets-spotter", external: true },
  { key: "oceanfront", href: "https://oceanfronthardware.com", external: true },
  { key: "ai4x", href: "/experience", external: false }
] as const;

const linkClass = "text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300";

export default async function HomeEvidence() {
  const t = await getTranslations("content.home.evidence");

  return (
    // 64px above the block: this is a major entry in the page's rhythm, not a sibling
    // paragraph, and the extra step separates who-he-is from the proof of it.
    <ul className="pt-8">
      {ROWS.map(({ key, href, external }) => (
        <li key={key} className="grid gap-1 border-t py-4 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-6">
          {/*
            Label sits at Body size, not the larger mono Label step: an orientation label
            louder than the claim beside it inverts the Mono Label Rule. At matching sizes
            the change of register is carried by the typeface alone, which is the point of
            the mono/sans split.
          */}
          <h3 className="font-mono">
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1.5`}>
                {t(`${key}.label`)}
                <ArrowTopRightOnSquareIcon className="size-4 shrink-0" aria-hidden />
              </a>
            ) : (
              <Link href={href} className={linkClass}>
                {t(`${key}.label`)}
              </Link>
            )}
          </h3>
          <p className="text-pretty">{t(`${key}.claim`)}</p>
        </li>
      ))}
    </ul>
  );
}

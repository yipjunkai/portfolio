import type { Locale } from "@/i18n/routing";
import { buildNavSections } from "./navSections";
import Sidebar from "./Sidebar";

/** The default desktop sidebar (global nav) for the @sidebar parallel-route slot. */
export default async function NavSidebar({ locale }: { locale: Locale }) {
  const sections = await buildNavSections(locale);
  return <Sidebar sections={sections} />;
}

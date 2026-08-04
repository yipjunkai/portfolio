import { requireLocale } from "@/i18n/locale";
import NavSidebar from "../_components/NavSidebar";

/** Fallback @sidebar slot: the global nav for every route without a more specific slot. */
export default async function SidebarDefault({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <NavSidebar locale={requireLocale(locale)} />;
}

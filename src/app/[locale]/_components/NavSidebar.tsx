import { buildNavSections } from "./navSections";
import Sidebar from "./Sidebar";

/** The default desktop sidebar (global nav) for the @sidebar parallel-route slot. */
export default async function NavSidebar() {
  const sections = await buildNavSections();
  return <Sidebar sections={sections} />;
}

import NavSidebar from "../../_components/NavSidebar";

/**
 * Explicit @sidebar match for the /blog index (renders the global nav).
 * A page.tsx (not just default.tsx) is required so a soft navigation from a post back to
 * /blog actively re-renders this slot instead of keeping the previous post's TOC rail.
 */
export default function BlogIndexSidebar() {
  return <NavSidebar />;
}

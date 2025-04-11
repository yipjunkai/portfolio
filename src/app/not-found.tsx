import Link from "next/link";
import undrawVibeCoding from "./_assets/undraw_vibe-coding_mjme.svg";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-4/5 space-y-4">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <Image
        src={undrawVibeCoding}
        alt="404 page illustration"
        className="size-160"
      />
      <Link href="/" className="primary-button flex items-center gap-2">
        <HomeIcon className="size-6" />
        <span>Go home</span>
      </Link>
    </div>
  );
}

import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import undrawVibeCoding from "./_assets/undraw_vibe-coding_mjme.svg";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-4/5 flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <Image src={undrawVibeCoding} alt="404 page illustration" className="size-160" />
      <Button variant="default" asChild>
        <Link href="/">
          <HomeIcon className="size-6" />
          <span>Go home</span>
        </Link>
      </Button>
    </div>
  );
}

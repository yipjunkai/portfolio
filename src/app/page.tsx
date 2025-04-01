import { ArrowDownTrayIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="space-y-5">
        <h1 className="text-5xl font-bold mb-3">Hey, I'm Jun Kai</h1>
        <h2 className="text-2xl font-bold flex flex-row items-center gap-2">
          <MapPinIcon className="w-6 h-6" />
          <span>Singapore</span>
        </h2>
        <p className="text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
          nihil at pariatur voluptas fugit necessitatibus, culpa eveniet quos
          obcaecati nesciunt nemo numquam sapiente eaque autem facere
          asperiores, illo ad hic.
        </p>
        <div className="flex flex-row gap-2 *:px-4 *:py-2 *:rounded-md *:flex *:items-center *:gap-2">
          <Link
            href="mailto:junkai@gmail.com"
            className="bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4" />
            <span>Email me</span>
          </Link>
          <button className="bg-neutral-800 hover:bg-neutral-700 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </div>
  );
}

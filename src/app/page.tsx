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
        <div className="flex flex-col lg:flex-row gap-4 *:flex *:items-center *:gap-4 *:text-2xl">
          <Link href="mailto:junkai@gmail.com" className="primary-button">
            <EnvelopeIcon className="w-6 h-6" />
            <span>Email me</span>
          </Link>
          <Link
            href="https://bit.ly/resume"
            className="secondary-button"
            target="_blank"
          >
            <ArrowDownTrayIcon className="w-6 h-6" />
            <span>Download CV</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

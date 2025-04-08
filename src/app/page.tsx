import {
  ArrowDownTrayIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[calc(100vh-8rem)] md:h-min space-y-8">
        <h1 className="md:font-bold">
          <span className="text-3xl md:text-5xl">Hey, I'm </span>
          <br className="block md:hidden" />
          <span className="text-7xl md:text-5xl font-bold">Jun Kai</span>
        </h1>
        <h2 className="text-2xl font-mono flex flex-row items-center gap-2">
          <MapPinIcon className="size-6" />
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
            <EnvelopeIcon className="size-6" />
            <span>Email me</span>
          </Link>
          <Link
            href="https://bit.ly/resume"
            className="secondary-button"
            target="_blank"
          >
            <ArrowDownTrayIcon className="size-6" />
            <span>Download CV</span>
          </Link>
        </div>
      </div>
    </>
  );
}

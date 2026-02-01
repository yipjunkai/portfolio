import { StaticImageData } from "next/image";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function ImageCarousel({
  images,
  className
}: {
  images: {
    src: string | StaticImageData;
    alt: string;
  }[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className={`flex snap-x snap-mandatory overflow-x-scroll overflow-y-hidden`}>
        {images.map((image, index) => (
          <Image
            id={`image-${index}`}
            key={index}
            src={image.src}
            alt={image.alt}
            className="shrink-0 snap-start bg-neutral-300 object-contain dark:bg-neutral-800"
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 grid -translate-x-1/2 grid-flow-col gap-2 rounded-full bg-gradient-to-r from-grad-1 to-grad-2 p-1">
        {images.map((image, index) => (
          <Link
            key={index}
            className="size-4 rounded-full bg-white opacity-75 transition-opacity hover:opacity-100"
            href={`#image-${index}`}
            aria-label={`Link to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

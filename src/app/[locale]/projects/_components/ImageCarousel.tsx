import { StaticImageData } from "next/image";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function ImageCarousel({
  images,
  className,
}: {
  images: {
    src: string | StaticImageData;
    alt: string;
  }[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`overflow-y-hidden overflow-x-scroll snap-x snap-mandatory flex`}
      >
        {images.map((image, index) => (
          <Image
            id={`image-${index}`}
            key={index}
            src={image.src}
            alt={image.alt}
            className="object-contain shrink-0 snap-start bg-neutral-300 dark:bg-neutral-800"
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-grad-1 to-grad-2 grid grid-flow-col gap-2 rounded-full p-1">
        {images.map((image, index) => (
          <Link
            key={index}
            className="bg-white size-4 rounded-full opacity-75 transition-opacity hover:opacity-100"
            href={`#image-${index}`}
            aria-label={`Link to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

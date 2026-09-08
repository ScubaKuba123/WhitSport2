import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

export default function Carousel({ children }: { children: React.ReactNode[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", slidesToScroll: 1, containScroll: "trimSnaps" }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children.map((c, i) => (
            <div key={i} className="flex-[0_0_280px] min-w-0">
              {c}
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} aria-label="prev" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border shadow rounded-full w-9 h-9 grid place-items-center hover:bg-zinc-50">‹</button>
      <button onClick={scrollNext} aria-label="next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border shadow rounded-full w-9 h-9 grid place-items-center hover:bg-zinc-50">›</button>
    </div>
  );
}

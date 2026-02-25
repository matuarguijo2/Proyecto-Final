"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const slides = [
  {
    title: "Nuestra misión es ayudar a todos los pacientes con cáncer de sangre que lo necesiten.",
    description:
      "Gota de Sangre es una iniciativa dedicada a la donación de sangre y al apoyo de pacientes con cáncer de sangre y otras enfermedades que requieren transfusiones. Trabajamos para dar una segunda oportunidad de vida al mayor número posible de personas, conectando donantes voluntarios con quienes más lo necesitan.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    imageAlt: "Comunidad y solidaridad",
  },
  {
    title: "Tu donación puede salvar hasta tres vidas.",
    description:
      "Cada unidad de sangre donada puede separarse en glóbulos rojos, plaquetas y plasma, ayudando a pacientes en tratamientos oncológicos, cirugías y emergencias. Sumate como donante voluntario y formá parte de esta cadena de vida.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    imageAlt: "Atención médica y donación",
  },
];

export default function MisionCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 20,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden bg-[#e3f2fd]">
      <div className="embla h-[85vh] min-h-[480px] max-h-[800px]" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide min-h-0 flex h-full min-w-0 flex-[0_0_100%] flex-col md:flex-row"
            >
              <div className="flex flex-shrink-0 flex-col justify-center bg-[#e3f2fd] px-6 py-10 md:w-[45%] md:min-w-[320px] md:max-w-[520px] md:px-12 md:py-14">
                <h1 className="mb-5 text-2xl font-bold leading-tight text-[#0d47a1] md:mb-6 md:text-3xl lg:text-4xl">
                  {slide.title}
                </h1>
                <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                  {slide.description}
                </p>
              </div>
              <div className="relative min-h-[260px] flex-1 min-w-0 md:min-h-0">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm">
        <button
          type="button"
          onClick={scrollPrev}
          className="rounded-full p-1.5 text-white transition hover:bg-white/20"
          aria-label="Anterior"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition ${i === selectedIndex ? "bg-white scale-125" : "bg-white/60"}`}
              aria-label={`Ir a diapositiva ${i + 1}`}
              aria-current={i === selectedIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          className="rounded-full p-1.5 text-white transition hover:bg-white/20"
          aria-label="Siguiente"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

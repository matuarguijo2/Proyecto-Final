"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Tu sangre puede salvar vidas",
    description:
      "Cada donación cuenta. Con un gesto sencillo podés dar esperanza a quienes más lo necesitan. Sumate como donante voluntario.",
    buttonText: "Regístrate",
    href: "/registro",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80",
    imageAlt: "Donación de sangre",
  },
  {
    title: "Conocé los lugares para donar en Tucumán",
    description:
      "Encontrá hospitales, clínicas y centros de hemoterapia donde podés acercarte a donar sangre o obtener información.",
    buttonText: "Mapa",
    href: "/mapa",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80",
    imageAlt: "Centros de donación",
  },
  {
    title: "Campañas de donación",
    description:
      "Conocé las campañas activas que necesitan donantes. Tu ayuda puede ser la diferencia para alguien que espera una donación.",
    buttonText: "Conoce las campañas",
    href: "/conocemas/campanas",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
    imageAlt: "Campañas de donación",
  },
];

export default function HeroCarousel() {
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

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden bg-[#fce4ec]">
      <div className="embla h-[88vh] min-h-[520px] max-h-[900px]" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide min-h-0 flex h-full min-w-0 flex-[0_0_100%] flex-col md:flex-row"
            >
              {/* Parte izquierda: texto con tamaños generosos */}
              <div className="flex flex-shrink-0 flex-col justify-between bg-[#fce4ec] px-6 py-8 md:w-[36%] md:min-w-[300px] md:max-w-[400px] md:px-10 md:py-12">
                <div>
                  <h2 className="mb-4 text-2xl font-bold leading-tight text-primary md:mb-5 md:text-4xl lg:text-[2.5rem]">
                    {slide.title}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-800 md:text-xl md:leading-relaxed">
                    {slide.description}
                  </p>
                </div>
                <div className="mt-6 flex justify-end md:mt-8">
                  {slide.href ? (
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-lg font-semibold text-white no-underline transition hover:opacity-95 md:px-8 md:py-4 md:text-xl"
                    >
                      {slide.buttonText}
                      <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <span
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-primary/80 px-6 py-4 text-lg font-semibold text-white md:px-8 md:py-4 md:text-xl"
                      title="Próximamente"
                    >
                      {slide.buttonText}
                      <span aria-hidden>→</span>
                    </span>
                  )}
                </div>
              </div>
              {/* Parte derecha: imagen ocupa todo el alto disponible */}
              <div className="relative min-h-[280px] flex-1 min-w-0 md:min-h-0">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 64vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles: flechas y puntos */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/20 px-3 py-2 backdrop-blur-sm">
        <button
          type="button"
          onClick={scrollPrev}
          className="rounded-full p-1.5 text-white transition hover:bg-white/20"
          aria-label="Diapositiva anterior"
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
              className={`h-2 w-2 rounded-full transition ${
                i === selectedIndex ? "bg-white scale-125" : "bg-white/60"
              }`}
              aria-label={`Ir a diapositiva ${i + 1}`}
              aria-current={i === selectedIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={scrollNext}
          className="rounded-full p-1.5 text-white transition hover:bg-white/20"
          aria-label="Diapositiva siguiente"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

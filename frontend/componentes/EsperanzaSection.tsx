import Image from "next/image";
import Link from "next/link";

type CardWithImage = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};
type CardDonarVida = { type: "donar-vida"; href: string };
type CardItem = CardWithImage | CardDonarVida;

const cards: CardItem[] = [
  {
    title: "Registrate como Donante",
    href: "/registro",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    imageAlt: "Registro como donante",
  },
  {
    title: "Ayudanos a seguir ayudando",
    href: "/aporte",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    imageAlt: "Contribuir",
  },
  {
    type: "donar-vida",
    href: "/involucrate/crear-campana",
  },
  {
    title: "Preguntas Frecuentes",
    href: "/requisitos-donante",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    imageAlt: "Preguntas frecuentes",
  },
];

function DonarVidaCard() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="relative flex flex-1 flex-col items-center justify-center py-6">
        <p className="mb-4 text-center text-2xl font-bold leading-tight text-primary md:text-3xl">
          Donar Sangre es Donar Vida
        </p>
        <svg
          viewBox="0 0 200 70"
          className="h-20 w-full max-w-[200px] text-primary"
          aria-hidden
        >
          <path
            d="M0 45 L20 45 L25 20 L35 50 L45 25 L55 45 L75 45 L80 15 L90 48 L100 22 L110 50 L120 18 L130 45 L200 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M97 28 L100 34 L103 28 C101 24 99 24 100 21 C101 24 103 24 103 28 Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          href="/involucrate/crear-campana"
          className="inline-flex items-center rounded-full border border-primary bg-white px-5 py-2.5 font-medium text-gray-900 no-underline transition hover:bg-red-50"
        >
          Crea Tu campaña
        </Link>
      </div>
    </div>
  );
}

export default function EsperanzaSection() {
  return (
    <section className="border-t border-gray-100 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Damos esperanza de vida a pacientes
          </h2>
          <Link
            href="/conocemas"
            className="inline-flex w-fit items-center rounded-full border border-primary bg-white px-5 py-2.5 font-medium text-gray-900 no-underline transition hover:bg-red-50"
          >
            Conoce más
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            if ("type" in card && card.type === "donar-vida") {
              return <DonarVidaCard key={index} />;
            }
            const c = card as CardWithImage;
            return (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-end p-5">
                  <Link
                    href={c.href}
                    className="inline-flex justify-center rounded-full border border-primary bg-white px-4 py-2.5 font-medium text-gray-900 no-underline transition hover:bg-red-50"
                  >
                    {c.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

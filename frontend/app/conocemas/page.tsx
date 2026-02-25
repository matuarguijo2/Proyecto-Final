import Link from "next/link";
import MisionCarousel from "./MisionCarousel";

export const metadata = {
  title: "Conoce Más | Gota de Sangre",
  description:
    "Nuestra misión es ayudar a todos los pacientes con cáncer de sangre que lo necesiten. Conocé más sobre donación y cómo sumarte.",
};

export default function ConoceMasPage() {
  return (
    <main>
      <MisionCarousel />
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
          Explorá más
        </h2>
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-1 md:grid-cols-3">
          <li>
            <Link
              href="/acerca-de-nosotros"
              className="block rounded-xl border border-gray-200 bg-white p-6 no-underline shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <span className="text-lg font-semibold text-primary">Acerca de nosotros</span>
              <p className="mt-2 text-sm text-gray-600">
                Conocé la historia y el equipo detrás de Gota de Sangre.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/cancer-de-sangre"
              className="block rounded-xl border border-gray-200 bg-white p-6 no-underline shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <span className="text-lg font-semibold text-primary">Cáncer de sangre</span>
              <p className="mt-2 text-sm text-gray-600">
                Información sobre cáncer de sangre y por qué la donación importa.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/conocemas/campanas"
              className="block rounded-xl border border-gray-200 bg-white p-6 no-underline shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <span className="text-lg font-semibold text-primary">Conocer campañas</span>
              <p className="mt-2 text-sm text-gray-600">
                Campañas activas que necesitan donantes. Sumate.
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

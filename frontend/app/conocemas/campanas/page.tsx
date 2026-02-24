import Link from "next/link";
import { getCampanas } from "@/lib/api-campanas";
import CampanaCard from "./CampanaCard";

export const metadata = {
  title: "Conocer campañas | Conoce Más",
  description: "Listado de campañas de donación de sangre registradas.",
};

export const dynamic = "force-dynamic";

export default async function ConocerCampanasPage() {
  const campanas = await getCampanas();

  return (
    <main>
      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="mb-8">
          <Link href="/conocemas" className="text-primary no-underline hover:underline">
            ← Volver a Conoce Más
          </Link>
        </div>

        <h1 className="mb-2 text-[2.5rem] text-primary">Conocer campañas</h1>
        <p className="mb-10 text-lg text-gray-600">
          Campañas de donación de sangre registradas. Contacta al organizador si deseas sumarte.
        </p>

        {campanas.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
            <p className="mb-4 text-gray-600">Aún no hay campañas registradas.</p>
            <Link
              href="/involucrate/crear-campana"
              className="inline-block rounded-full bg-primary px-5 py-2.5 text-white no-underline hover:opacity-95"
            >
              Crear campaña
            </Link>
          </div>
        ) : (
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-1 lg:grid-cols-2">
            {campanas.map((c) => (
              <CampanaCard key={c.id} c={c} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

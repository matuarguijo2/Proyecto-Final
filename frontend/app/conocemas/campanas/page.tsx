import Link from "next/link";
import { getCampanas, formatFechaLimite } from "@/lib/api-campanas";
import AccionesCampana from "./AccionesCampana";

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
              <li
                key={c.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {c.imagenUrl && (
                  <div className="relative h-48 w-full bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.imagenUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-primary">
                  {c.tituloAsunto}
                </h2>
                <p className="mb-2 text-sm text-gray-500">
                  Receptor: {c.nombreApellido} · DNI: {c.dni}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium">Grupo y factor:</span> {c.grupoSanguineoRh} ·{" "}
                  <span className="font-medium">Dadores necesarios:</span> {c.cantidadDadores}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium">Centro:</span> {c.nombreCentro}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium">Dirección:</span> {c.direccionCompleta}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium">Horarios:</span> {c.horariosDias}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium">Fecha límite:</span> {formatFechaLimite(c)}
                </p>
                <p className="mb-3 text-gray-700">
                  {c.descripcionRequisitos}
                </p>
                <p className="text-sm text-primary font-medium">
                  Contacto: {c.telefonoEmailOrganizador}
                </p>
                <AccionesCampana id={c.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

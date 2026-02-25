"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";
import { getMisCampanias, type CampaniaHospital } from "@/lib/hospitalApi";

export default function MisCampaniasHospitalPage() {
  const router = useRouter();
  const { hospital, token, loading: authLoading, logout: logoutHospital } = useHospitalAuth();
  const [campanias, setCampanias] = useState<CampaniaHospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !hospital) {
      router.push("/registro/hospital/login");
      return;
    }
    if (!token) return;
    setError("");
    getMisCampanias(token)
      .then(setCampanias)
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "Error al cargar";
        setError(msg);
        if (msg.toLowerCase().includes("token") || msg.toLowerCase().includes("inválido") || msg.toLowerCase().includes("expirado")) {
          logoutHospital().then(() => {
            router.push("/registro/hospital/login");
            router.refresh();
          });
        }
      })
      .finally(() => setLoading(false));
  }, [hospital, authLoading, token, router, logoutHospital]);

  if (authLoading || !hospital) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-4xl text-center text-gray-600">Cargando…</div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-primary">Mis campañas</h1>
        <p className="mb-8 text-gray-600">
          Gestioná las campañas de donación de tu institución.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {loading ? (
          <p className="text-gray-600">Cargando campañas…</p>
        ) : campanias.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="mb-4 text-gray-600">Aún no tenés campañas creadas.</p>
            <Link
              href="/involucrate/crear-campana"
              className="inline-block rounded-full bg-primary px-6 py-2.5 font-semibold text-white no-underline hover:opacity-95"
            >
              Crear campaña
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-end">
              <Link
                href="/involucrate/crear-campana"
                className="inline-block rounded-full bg-primary px-5 py-2.5 font-semibold text-white no-underline hover:opacity-95"
              >
                Crear campaña
              </Link>
            </div>
          <ul className="list-none space-y-4 p-0">
            {campanias.map((c) => (
              <li
                key={c.id}
                className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-semibold text-gray-900">{c.nombre}</h2>
                  <p className="text-sm text-gray-500">
                    Estado: {c.estado} · Inscripciones: {c._count?.inscripciones ?? 0}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/hospital/campanias/${c.id}/inscripciones`}
                    className="inline-block rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary no-underline hover:bg-red-50"
                  >
                    Ver inscritos
                  </Link>
                  <Link
                    href={`/hospital/campanias/${c.id}/editar`}
                    className="inline-block rounded-full bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:opacity-95"
                  >
                    Editar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          </>
        )}

        <p className="mt-8">
          <Link href="/hospital/mis-datos" className="text-primary hover:underline">
            Mis datos
          </Link>
        </p>
      </div>
    </main>
  );
}

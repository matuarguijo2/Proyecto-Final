"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";
import { getInscripcionesCampania, type InscripcionCampania } from "@/lib/hospitalApi";

export default function InscripcionesCampaniaPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  const { hospital, token, loading: authLoading } = useHospitalAuth();
  const [inscripciones, setInscripciones] = useState<InscripcionCampania[]>([]);
  const [nombreCampania, setNombreCampania] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !hospital) {
      router.push("/registro/hospital/login");
      return;
    }
    if (!token || Number.isNaN(id)) return;
    getInscripcionesCampania(token, id)
      .then((data) => {
        setNombreCampania(data.campania.nombre);
        setInscripciones(data.inscripciones);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar"))
      .finally(() => setLoading(false));
  }, [hospital, authLoading, token, id, router]);

  if (authLoading || !hospital) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-2xl text-center text-gray-600">Cargando…</div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-primary">Inscritos en la campaña</h1>
        <p className="mb-8 text-gray-600">{nombreCampania || "Cargando…"}</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        {loading ? (
          <p className="text-gray-600">Cargando inscripciones…</p>
        ) : inscripciones.length === 0 ? (
          <p className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
            Aún no hay personas inscritas en esta campaña.
          </p>
        ) : (
          <ul className="list-none space-y-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {inscripciones.map((ins) => (
              <li key={ins.id} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
                <span className="text-gray-900">{ins.email}</span>
                <span className="text-sm text-gray-500">
                  {new Date(ins.createdAt).toLocaleDateString("es-AR")}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8">
          <Link href="/hospital/mis-campanias" className="text-primary hover:underline">
            ← Volver a mis campañas
          </Link>
        </p>
      </div>
    </main>
  );
}

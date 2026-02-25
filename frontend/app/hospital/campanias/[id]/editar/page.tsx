"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";
import { getMisCampanias, updateCampania } from "@/lib/hospitalApi";

const ESTADOS = ["Activa", "Finalizada", "Cancelada"] as const;

export default function EditarCampaniaHospitalPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  const { hospital, token, loading: authLoading } = useHospitalAuth();
  const [loading, setLoading] = useState(false);
  const [loadCampania, setLoadCampania] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<{
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    ubicacion: string;
    estado: "Activa" | "Finalizada" | "Cancelada";
  }>({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    ubicacion: "",
    estado: "Activa",
  });

  useEffect(() => {
    if (!authLoading && !hospital) {
      router.push("/registro/hospital/login");
      return;
    }
    if (!token || Number.isNaN(id)) return;
    if (!loadCampania) return;
    getMisCampanias(token)
      .then((list) => {
        const c = list.find((x) => x.id === id);
        if (!c) {
          setError("Campaña no encontrada o no autorizada");
          return;
        }
        setForm({
          nombre: c.nombre,
          descripcion: c.descripcion || "",
          fecha_inicio: c.fecha_inicio.slice(0, 16),
          fecha_fin: c.fecha_fin ? c.fecha_fin.slice(0, 16) : "",
          ubicacion: c.ubicacion || "",
          estado: (c.estado as "Activa" | "Finalizada" | "Cancelada") || "Activa",
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar"))
      .finally(() => setLoadCampania(false));
  }, [hospital, authLoading, token, id, router, loadCampania]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || Number.isNaN(id)) return;
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await updateCampania(token, id, {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim() || undefined,
        fecha_inicio: form.fecha_inicio ? new Date(form.fecha_inicio).toISOString() : undefined,
        fecha_fin: form.fecha_fin ? new Date(form.fecha_fin).toISOString() : undefined,
        ubicacion: form.ubicacion.trim() || undefined,
        estado: form.estado,
      });
      setMessage("Campaña actualizada correctamente.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || !hospital) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-lg text-center text-gray-600">Cargando…</div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-3xl font-bold text-primary">Editar campaña</h1>
        <p className="mb-8 text-gray-600">Modificá los datos de la campaña.</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}
        {message && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>
        )}

        {loadCampania ? (
          <p className="text-gray-600">Cargando campaña…</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={form.descripcion}
                onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Fecha inicio</label>
              <input
                type="datetime-local"
                value={form.fecha_inicio}
                onChange={(e) => setForm((p) => ({ ...p, fecha_inicio: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Fecha fin (opcional)</label>
              <input
                type="datetime-local"
                value={form.fecha_fin}
                onChange={(e) => setForm((p) => ({ ...p, fecha_fin: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Ubicación</label>
              <input
                type="text"
                value={form.ubicacion}
                onChange={(e) => setForm((p) => ({ ...p, ubicacion: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm((p) => ({ ...p, estado: e.target.value as typeof form.estado }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {ESTADOS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Guardando…" : "Guardar cambios"}
            </button>
          </form>
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

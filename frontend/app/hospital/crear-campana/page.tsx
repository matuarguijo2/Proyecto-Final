"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHospitalAuth } from "@/contextos/HospitalAuthContext";
import { createCampaniaHospital } from "@/lib/hospitalApi";

const ESTADOS = ["Activa", "Finalizada", "Cancelada"] as const;

export default function CrearCampaniaHospitalPage() {
  const router = useRouter();
  const { hospital, token, loading: authLoading } = useHospitalAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    estado: "Activa" as const,
  });

  useEffect(() => {
    if (!authLoading && !hospital) {
      router.push("/registro/hospital/login");
      return;
    }
  }, [hospital, authLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError("");
    setLoading(true);
    try {
      await createCampaniaHospital(token, {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim() || undefined,
        ubicacion: form.ubicacion.trim(),
        estado: form.estado,
      });
      router.push("/hospital/mis-campanias");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la campaña");
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
        <h1 className="mb-2 text-3xl font-bold text-primary">Crear campaña</h1>
        <p className="mb-8 text-gray-600">Creá una nueva campaña de donación para tu institución.</p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

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
            <label className="mb-1 block text-sm font-medium text-gray-700">Descripción (opcional)</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Ubicación</label>
            <input
              type="text"
              value={form.ubicacion}
              onChange={(e) => setForm((p) => ({ ...p, ubicacion: e.target.value }))}
              required
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
            {loading ? "Creando…" : "Crear campaña"}
          </button>
        </form>

        <p className="mt-8">
          <Link href="/hospital/mis-campanias" className="text-primary hover:underline">
            ← Volver a mis campañas
          </Link>
        </p>
      </div>
    </main>
  );
}

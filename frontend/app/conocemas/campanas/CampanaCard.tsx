"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Campana } from "@/lib/api-campanas";
import { formatFechaLimite, inscribirEnCampania } from "@/lib/api-campanas";
import AccionesCampana from "./AccionesCampana";

export default function CampanaCard({ c }: { c: Campana }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const meta = c.meta || 0;
  const inscritos = c.inscripcionesCount ?? 0;
  const porcentaje = meta > 0 ? Math.min(100, Math.round((inscritos / meta) * 100)) : 0;

  async function handleInscribir(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setMessage({ type: "error", text: "Ingresá tu email." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const result = await inscribirEnCampania(c.id, email);
      setMessage({
        type: "ok",
        text: result.message || `¡Inscripto! ${result.inscripciones} de ${result.meta} dadores.`,
      });
      setEmail("");
      if (result.completada) {
        router.refresh();
        return;
      }
      router.refresh();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Error al inscribirse.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <li className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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

        {meta > 0 && (
          <div className="mb-4">
            <div className="mb-1 flex justify-between text-sm text-gray-600">
              <span>Progreso: {inscritos} / {meta} inscriptos</span>
              <span>{porcentaje}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
          </div>
        )}

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
        <p className="mb-4 text-sm text-primary font-medium">
          Contacto: {c.telefonoEmailOrganizador}
        </p>

        {meta > 0 && (
          <form onSubmit={handleInscribir} className="mb-4 flex flex-wrap items-end gap-2">
            <label htmlFor={`email-${c.id}`} className="sr-only">
              Email para inscribirse
            </label>
            <input
              id={`email-${c.id}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Enviando…" : "Inscribirme"}
            </button>
          </form>
        )}
        {message && (
          <p
            className={`mb-2 text-sm ${message.type === "ok" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </p>
        )}

        <AccionesCampana id={c.id} />
      </div>
    </li>
  );
}

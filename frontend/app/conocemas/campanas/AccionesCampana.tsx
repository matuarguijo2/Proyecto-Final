"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AccionesCampanaProps = { id: string };

export default function AccionesCampana({ id }: AccionesCampanaProps) {
  const router = useRouter();
  const [eliminando, setEliminando] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      const res = await fetch(`/api/campanas/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Error al eliminar la campaña");
    } catch {
      alert("Error al eliminar la campaña");
    } finally {
      setEliminando(false);
      setMostrarConfirmar(false);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Link
        href={`/involucrate/crear-campana/${id}`}
        className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:opacity-95"
      >
        Modificar
      </Link>
      {mostrarConfirmar ? (
        <span className="flex items-center gap-2">
          <span className="text-sm text-gray-600">¿Eliminar?</span>
          <button
            type="button"
            onClick={handleEliminar}
            disabled={eliminando}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {eliminando ? "Eliminando…" : "Sí, eliminar"}
          </button>
          <button
            type="button"
            onClick={() => setMostrarConfirmar(false)}
            disabled={eliminando}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setMostrarConfirmar(true)}
          className="rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

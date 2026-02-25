"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contextos/AuthContext";
import { getMisCampanias, type CampaniaUsuario } from "@/lib/usuarioCampaniasApi";
import FormularioCrearCampana, { type FormStateCampana } from "@/app/involucrate/crear-campana/FormularioCrearCampana";

function campaniaToFormState(c: CampaniaUsuario): FormStateCampana {
  const fechaFin = c.fecha_fin ? new Date(c.fecha_fin) : null;
  return {
    nombreApellido: c.nombreApellidoReceptor ?? "",
    dni: c.dniReceptor ?? "",
    grupoSanguineoRh: c.grupoSanguineoRh ?? "",
    cantidadDadores: c.cantidadDadores ?? "",
    nombreCentro: c.nombreCentro ?? "",
    direccionCompleta: c.direccionCompleta ?? "",
    horariosDias: c.horariosDias ?? "",
    fechaLimiteAnio: fechaFin ? String(fechaFin.getFullYear()) : "",
    fechaLimiteMes: fechaFin ? String(fechaFin.getMonth()) : "",
    fechaLimiteDia: fechaFin ? String(fechaFin.getDate()) : "",
    tituloAsunto: c.nombre,
    descripcionRequisitos: c.descripcion ?? "",
    telefonoEmailOrganizador: c.telefonoEmailOrganizador ?? "",
    imagenUrl: c.imagen_url ?? "",
  };
}

export default function EditarCampaniaUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const { user, token, loading: authLoading } = useAuth();
  const [initialData, setInitialData] = useState<FormStateCampana | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/registro/donante");
      return;
    }
    if (!token || !id) return;
    getMisCampanias(token)
      .then((list) => {
        const c = list.find((x) => x.id === Number(id));
        if (!c) {
          setError("Campaña no encontrada o no autorizada");
          return;
        }
        setInitialData(campaniaToFormState(c));
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar"))
      .finally(() => setLoading(false));
  }, [user, authLoading, token, id, router]);

  if (authLoading || !user) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-4xl text-center text-gray-600">Cargando…</div>
      </main>
    );
  }

  if (error || !id) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
          )}
          <Link href="/usuario/mis-campanias" className="text-primary hover:underline">
            ← Volver a mis campañas
          </Link>
        </div>
      </main>
    );
  }

  if (loading || !initialData) {
    return (
      <main className="min-h-[60vh] px-4 py-12">
        <div className="mx-auto max-w-4xl text-center text-gray-600">Cargando campaña…</div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 py-12">
      <FormularioCrearCampana
        campaniaId={id}
        initialData={initialData}
        editAsUsuario
      />
    </main>
  );
}

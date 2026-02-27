const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type Campana = {
  id: string;
  createdAt: string;
  nombreApellido: string;
  dni: string;
  grupoSanguineoRh: string;
  cantidadDadores: string;
  nombreCentro: string;
  direccionCompleta: string;
  horariosDias: string;
  fechaLimiteAnio: string;
  fechaLimiteMes: string;
  fechaLimiteDia: string;
  tituloAsunto: string;
  descripcionRequisitos: string;
  telefonoEmailOrganizador: string;
  imagenUrl?: string;
  /** Inscripciones actuales (para la barra de progreso) */
  inscripcionesCount: number;
  /** Meta de dadores (número) para el progreso */
  meta: number;
};

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type CampanaBackend = {
  id: number;
  nombre: string;
  descripcion: string | null;
  fecha_fin: string | null;
  ubicacion: string | null;
  imagen_url: string | null;
  createdAt?: string;
  nombreApellidoReceptor?: string | null;
  dniReceptor?: string | null;
  grupoSanguineoRh?: string | null;
  cantidadDadores?: string | null;
  nombreCentro?: string | null;
  direccionCompleta?: string | null;
  horariosDias?: string | null;
  telefonoEmailOrganizador?: string | null;
  hospital?: { nombre: string; direccion: string; horario_atencion: string; email: string } | null;
  _count?: { inscripciones: number };
};

function mapBackendToFrontend(c: CampanaBackend): Campana {
  const fechaFin = c.fecha_fin ? new Date(c.fecha_fin) : null;
  const cantidadStr = c.cantidadDadores ?? "";
  const meta = parseInt(cantidadStr, 10);
  const inscripcionesCount = c._count?.inscripciones ?? 0;
  return {
    id: String(c.id),
    createdAt: c.createdAt || new Date().toISOString(),
    tituloAsunto: c.nombre,
    nombreApellido: c.nombreApellidoReceptor ?? c.hospital?.nombre ?? "",
    dni: c.dniReceptor ?? "",
    grupoSanguineoRh: c.grupoSanguineoRh ?? "",
    cantidadDadores: cantidadStr,
    nombreCentro: c.nombreCentro ?? c.hospital?.nombre ?? "",
    direccionCompleta: c.direccionCompleta ?? c.ubicacion ?? c.hospital?.direccion ?? "",
    horariosDias: c.horariosDias ?? c.hospital?.horario_atencion ?? "",
    fechaLimiteAnio: fechaFin ? String(fechaFin.getFullYear()) : "",
    fechaLimiteMes: fechaFin ? String(fechaFin.getMonth()) : "",
    fechaLimiteDia: fechaFin ? String(fechaFin.getDate()) : "",
    descripcionRequisitos: c.descripcion ?? "",
    telefonoEmailOrganizador: c.telefonoEmailOrganizador ?? c.hospital?.email ?? "",
    imagenUrl: c.imagen_url ?? undefined,
    inscripcionesCount,
    meta: Number.isNaN(meta) ? 0 : meta,
  };
}

export async function getCampanas(): Promise<Campana[]> {
  try {
    const res = await fetch(`${API_URL}/api/campanias`, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }
    const data: CampanaBackend[] = await res.json();
    return data.map(mapBackendToFrontend);
  } catch {
    return [];
  }
}

export async function getCampanaById(id: string): Promise<Campana | null> {
  try {
    const res = await fetch(`${API_URL}/api/campanias/${id}`, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    const data: CampanaBackend = await res.json();
    return mapBackendToFrontend(data);
  } catch {
    return null;
  }
}

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/** Inscribirse en una campaña con tu email. Devuelve el nuevo conteo y si la campaña se completó. */
export async function inscribirEnCampania(
  campaniaId: string,
  email: string
): Promise<{ inscripciones: number; meta: number; completada: boolean; message?: string }> {
  const res = await fetch(`${getApiUrl()}/api/campanias/${campaniaId}/inscribir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });
  const data = await res.json();
  if (!res.ok && res.status !== 200) {
    throw new Error(data.error || "Error al inscribirse");
  }
  return {
    inscripciones: data.inscripciones ?? 0,
    meta: data.meta ?? 0,
    completada: data.completada === true,
    message: data.message,
  };
}

export function formatFechaLimite(c: Campana): string {
  const dia = c.fechaLimiteDia;
  const mesIdx = parseInt(c.fechaLimiteMes, 10);
  const mes = Number.isNaN(mesIdx) ? "" : MESES[mesIdx] ?? "";
  const anio = c.fechaLimiteAnio;
  return [dia, mes, anio].filter(Boolean).join(" / ");
}

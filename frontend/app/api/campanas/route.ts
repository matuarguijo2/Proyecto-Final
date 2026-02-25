import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const dynamic = "force-dynamic";

type CampanaBackend = {
  id: number;
  nombre: string;
  descripcion: string | null;
  fecha_inicio: string;
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
};

type CampanaFrontend = {
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
};

function mapBackendToFrontend(c: CampanaBackend): CampanaFrontend {
  const fechaFin = c.fecha_fin ? new Date(c.fecha_fin) : null;
  return {
    id: String(c.id),
    createdAt: c.createdAt || new Date().toISOString(),
    tituloAsunto: c.nombre,
    nombreApellido: c.nombreApellidoReceptor ?? c.hospital?.nombre ?? "",
    dni: c.dniReceptor ?? "",
    grupoSanguineoRh: c.grupoSanguineoRh ?? "",
    cantidadDadores: c.cantidadDadores ?? "",
    nombreCentro: c.nombreCentro ?? c.hospital?.nombre ?? "",
    direccionCompleta: c.direccionCompleta ?? c.ubicacion ?? c.hospital?.direccion ?? "",
    horariosDias: c.horariosDias ?? c.hospital?.horario_atencion ?? "",
    fechaLimiteAnio: fechaFin ? String(fechaFin.getFullYear()) : "",
    fechaLimiteMes: fechaFin ? String(fechaFin.getMonth()) : "",
    fechaLimiteDia: fechaFin ? String(fechaFin.getDate()) : "",
    descripcionRequisitos: c.descripcion ?? "",
    telefonoEmailOrganizador: c.telefonoEmailOrganizador ?? c.hospital?.email ?? "",
    imagenUrl: c.imagen_url ?? undefined,
  };
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/campanias`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Error al obtener campañas");
    }
    const data: CampanaBackend[] = await res.json();
    const campanas = data.map(mapBackendToFrontend);
    return NextResponse.json(campanas);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener campañas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    const res = await fetch(`${API_URL}/api/campanias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Error al crear la campaña" },
        { status: res.status }
      );
    }
    return NextResponse.json(mapBackendToFrontend(data));
  } catch {
    return NextResponse.json(
      { error: "Error al crear la campaña" },
      { status: 500 }
    );
  }
}

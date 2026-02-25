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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${API_URL}/api/campanias/${id}`, { cache: "no-store" });
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Campaña no encontrada" }, { status: 404 });
      }
      throw new Error("Error al obtener la campaña");
    }
    const data: CampanaBackend = await res.json();
    return NextResponse.json(mapBackendToFrontend(data));
  } catch {
    return NextResponse.json(
      { error: "Error al obtener la campaña" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    const res = await fetch(`${API_URL}/api/campanias/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Error al actualizar la campaña" },
        { status: res.status }
      );
    }
    return NextResponse.json(mapBackendToFrontend(data));
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar la campaña" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const res = await fetch(`${API_URL}/api/campanias/${id}`, {
      method: "DELETE",
      headers: authHeader ? { Authorization: authHeader } : undefined,
    });
    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Campaña no encontrada" }, { status: 404 });
      }
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(
          { error: data.error || "No tenés permiso para eliminar esta campaña" },
          { status: 403 }
        );
      }
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: data.error || "Error al eliminar la campaña" },
        { status: res.status }
      );
    }
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar la campaña" },
      { status: 500 }
    );
  }
}

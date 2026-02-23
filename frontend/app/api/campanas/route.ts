import { NextRequest, NextResponse } from "next/server";
import { getCampanas, addCampana, type Campana } from "@/lib/campanas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const campanas = await getCampanas();
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
    const {
      nombreApellido,
      dni,
      grupoSanguineoRh,
      cantidadDadores,
      nombreCentro,
      direccionCompleta,
      horariosDias,
      fechaLimiteAnio,
      fechaLimiteMes,
      fechaLimiteDia,
      tituloAsunto,
      descripcionRequisitos,
      telefonoEmailOrganizador,
      imagenUrl,
    } = body as Omit<Campana, "id" | "createdAt">;

    if (
      !nombreApellido ||
      !dni ||
      !grupoSanguineoRh ||
      !cantidadDadores ||
      !nombreCentro ||
      !direccionCompleta ||
      !horariosDias ||
      !fechaLimiteAnio ||
      !fechaLimiteMes ||
      !fechaLimiteDia ||
      !tituloAsunto ||
      !descripcionRequisitos ||
      !telefonoEmailOrganizador
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const nueva = await addCampana({
      nombreApellido,
      dni,
      grupoSanguineoRh,
      cantidadDadores,
      nombreCentro,
      direccionCompleta,
      horariosDias,
      fechaLimiteAnio: String(fechaLimiteAnio),
      fechaLimiteMes: String(fechaLimiteMes),
      fechaLimiteDia: String(fechaLimiteDia),
      tituloAsunto,
      descripcionRequisitos,
      telefonoEmailOrganizador,
      ...(imagenUrl && { imagenUrl: String(imagenUrl) }),
    });
    return NextResponse.json(nueva);
  } catch {
    return NextResponse.json(
      { error: "Error al crear la campaña" },
      { status: 500 }
    );
  }
}

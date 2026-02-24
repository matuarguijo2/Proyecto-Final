import { notFound } from "next/navigation";
import { getCampanaById } from "@/lib/api-campanas";
import FormularioCrearCampana, { type FormStateCampana } from "../FormularioCrearCampana";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Modificar campaña | Involúcrate",
  description: "Editar los datos de una campaña de donación.",
};

export const dynamic = "force-dynamic";

function campanaToFormState(c: Awaited<ReturnType<typeof getCampanaById>>): FormStateCampana | null {
  if (!c) return null;
  return {
    nombreApellido: c.nombreApellido,
    dni: c.dni,
    grupoSanguineoRh: c.grupoSanguineoRh,
    cantidadDadores: c.cantidadDadores,
    nombreCentro: c.nombreCentro,
    direccionCompleta: c.direccionCompleta,
    horariosDias: c.horariosDias,
    fechaLimiteAnio: c.fechaLimiteAnio,
    fechaLimiteMes: c.fechaLimiteMes,
    fechaLimiteDia: c.fechaLimiteDia,
    tituloAsunto: c.tituloAsunto,
    descripcionRequisitos: c.descripcionRequisitos,
    telefonoEmailOrganizador: c.telefonoEmailOrganizador,
    imagenUrl: c.imagenUrl ?? "",
  };
}

export default async function EditarCampanaPage({ params }: PageProps) {
  const { id } = await params;
  const campana = await getCampanaById(id);
  const initialData = campanaToFormState(campana);
  if (!initialData) notFound();
  return (
    <main>
      <FormularioCrearCampana initialData={initialData} campaniaId={id} />
    </main>
  );
}

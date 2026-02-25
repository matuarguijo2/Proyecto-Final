const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type CampaniaUsuario = {
  id: number;
  nombre: string;
  descripcion: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  ubicacion: string | null;
  imagen_url: string | null;
  estado: string;
  createdAt: string;
  nombreApellidoReceptor: string | null;
  dniReceptor: string | null;
  grupoSanguineoRh: string | null;
  cantidadDadores: string | null;
  nombreCentro: string | null;
  direccionCompleta: string | null;
  horariosDias: string | null;
  telefonoEmailOrganizador: string | null;
  _count?: { inscripciones: number };
};

export type InscripcionCampania = {
  id: number;
  campaniaId: number;
  email: string;
  createdAt: string;
};

export async function getMisCampanias(token: string): Promise<CampaniaUsuario[]> {
  const res = await fetch(`${getApiUrl()}/api/auth/mis-campanias`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al cargar campañas");
  return data;
}

export async function updateMiCampania(
  token: string,
  id: string,
  body: Record<string, unknown>
): Promise<CampaniaUsuario> {
  const res = await fetch(`${getApiUrl()}/api/auth/campanias/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar la campaña");
  return data;
}

export async function getInscripcionesCampania(
  token: string,
  campaniaId: string
): Promise<InscripcionCampania[]> {
  const res = await fetch(
    `${getApiUrl()}/api/auth/campanias/${campaniaId}/inscripciones`,
    {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al cargar inscripciones");
  return data;
}

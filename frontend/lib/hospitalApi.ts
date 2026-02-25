const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type CampaniaHospital = {
  id: number;
  nombre: string;
  descripcion: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  ubicacion: string | null;
  imagen_url: string | null;
  estado: string;
  hospitalId: number | null;
  createdAt: string;
  _count?: { inscripciones: number };
};

export type InscripcionCampania = {
  id: number;
  campaniaId: number;
  email: string;
  createdAt: string;
};

export async function getMisCampanias(token: string): Promise<CampaniaHospital[]> {
  const res = await fetch(`${getApiUrl()}/api/hospital/mis-campanias`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener las campañas");
  return data;
}

export async function createCampaniaHospital(
  token: string,
  body: {
    nombre: string;
    descripcion?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    ubicacion: string;
    imagen_url?: string;
    estado?: string;
  }
): Promise<CampaniaHospital> {
  const res = await fetch(`${getApiUrl()}/api/hospital/campanias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al crear la campaña");
  return data;
}

export async function updateCampania(
  token: string,
  id: number,
  body: Partial<{
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    ubicacion: string;
    imagen_url: string;
    estado: string;
  }>
): Promise<CampaniaHospital> {
  const res = await fetch(`${getApiUrl()}/api/hospital/campanias/${id}`, {
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
  campaniaId: number
): Promise<{ campania: { id: number; nombre: string }; inscripciones: InscripcionCampania[] }> {
  const res = await fetch(`${getApiUrl()}/api/hospital/campanias/${campaniaId}/inscripciones`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener las inscripciones");
  return data;
}

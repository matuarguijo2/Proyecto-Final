import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

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
};

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getDataPath(): string {
  return path.join(process.cwd(), "data", "campanas.json");
}

export async function getCampanas(): Promise<Campana[]> {
  try {
    const p = getDataPath();
    const data = await readFile(p, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addCampana(
  data: Omit<Campana, "id" | "createdAt">
): Promise<Campana> {
  const campanas = await getCampanas();
  const nueva: Campana = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  campanas.push(nueva);
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await writeFile(getDataPath(), JSON.stringify(campanas, null, 2), "utf-8");
  return nueva;
}

export function formatFechaLimite(c: Campana): string {
  const dia = c.fechaLimiteDia;
  const mesIdx = parseInt(c.fechaLimiteMes, 10);
  const mes = Number.isNaN(mesIdx) ? "" : MESES[mesIdx] || "";
  const anio = c.fechaLimiteAnio;
  return [dia, mes, anio].filter(Boolean).join(" / ");
}

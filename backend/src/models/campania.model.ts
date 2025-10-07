import { z } from "zod";

export const CampaniaSchema = z.object({
  nombre: z.string().min(3, "La campaña debe tener un nombre"),
  hospitalId: z.number(), // Relación con hospital
    descripcion: z.string().optional(), // Campo opcional
    fecha_inicio: z.coerce.date(), // acepta string o Date
    fecha_fin: z.coerce.date().optional(), // Campo opcional
    ubicacion: z.string().min(3, "La ubicación debe tener al menos 3 caracteres"),
    imagen_url: z.string().url("Debe ser una URL válida").optional(),
    // agrega aquí otros campos si existen en tu modelo Prisma

});

export type CampaniaDTO = z.infer<typeof CampaniaSchema>;

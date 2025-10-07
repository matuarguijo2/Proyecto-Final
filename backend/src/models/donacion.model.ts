import { z } from "zod";

export const DonacionSchema = z.object({
  DonanteId: z.number(),   // Relación con Donante
  campaniaId: z.number().optional(),  // Relación con Campaña
  fecha_donacion: z.coerce.date(), // acepta string o Date
  tipo_donacion: z.enum(["sangre_completa", "plasma", "plaqueta"]),
  observaciones: z.string().max(500).optional(),
  estado: z.enum(["pendiente", "exitosa", "rechazada"]).optional(),
  hospitalId: z.number().optional() // Relación con Hospital
  // agrega aquí otros campos si existen en tu modelo Prisma
});

export type DonacionDTO = z.infer<typeof DonacionSchema>;

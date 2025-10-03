import { z } from "zod";

export const HospitalSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  direccion: z.string().min(5, "La dirección es obligatoria"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
  email: z.email("Email inválido"),
  tipo: z.enum(["Publico", "Privado"]),
  horario_atencion: z.string().min(4, "El horario de atención es obligatorio"),
  // agrega aquí otros campos si existen en tu modelo Prisma
});

export type HospitalDTO = z.infer<typeof HospitalSchema>;

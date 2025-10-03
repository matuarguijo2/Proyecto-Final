import { z } from "zod";

export const DonanteSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  grupo_sanguineo: z.enum(["A", "B", "AB", "O"]),
  factor_rh: z.enum(["positivo", "negativo"]),
  fecha_nacimiento: z.coerce.date(), // acepta string o Date
  sexo: z.enum(["Masculino", "Femenino"]),
  // agrega aquí otros campos si existen en tu modelo Prisma
});

// Tipo TypeScript derivado del schema
export type DonanteDTO = z.infer<typeof DonanteSchema>;

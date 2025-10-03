import { z } from "zod";

export const DonanteSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  dni: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  grupo_sanguineo: z.string(),
  factor_rh: z.string(),
  fecha_nacimiento: z.coerce.date(), // acepta string o Date
  sexo: z.string(),
  // otros campos opcionales si existen...
});

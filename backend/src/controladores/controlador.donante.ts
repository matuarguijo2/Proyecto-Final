import { DonanteSchema } from "../models/donante.modelo";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const crearDonante = async (req: import("express").Request, res: import("express").Response) => {
  try {
    // Validamos con Zod
    const data = DonanteSchema.parse(req.body);

    // Mapeo explícito de campos para Prisma
    const nuevoDonante = await prisma.donante.create({
      data: {
        email: data.email,
        password: data.password,
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        grupo_sanguineo: data.grupo_sanguineo,
        factor_rh: data.factor_rh,
        fecha_nacimiento: data.fecha_nacimiento,
        sexo: data.sexo,
        // agrega aquí otros campos válidos si existen en tu modelo
      }
    });

    res.json(nuevoDonante);
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ errores: error.errors });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

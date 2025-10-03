import { HospitalSchema } from "../models/hospital.modelo";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export const crearHospital = async (req: Request, res: Response) => {
  try {
    const data = HospitalSchema.parse(req.body);
    // Convierte telefono a número si es string
    const hospital = await prisma.hospital.create({
      data: {
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: typeof data.telefono === "string" ? Number(data.telefono) : data.telefono,
        email: data.email,
        tipo: data.tipo,
        horario_atencion: data.horario_atencion,
        // agrega aquí otros campos válidos según tu modelo Prisma
      },
    });
    res.json(hospital);
  } catch (error: any) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: error.message || "Error interno del servidor" });
    }
  }
};

export const obtenerHospitales = async (req: Request, res: Response) => {
  const hospitales = await prisma.hospital.findMany();
  res.json(hospitales);
};

export const obtenerHospital = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hospital = await prisma.hospital.findUnique({ where: { id: Number(id) } });
  if (!hospital) return res.status(404).json({ error: "Hospital no encontrado" });
  res.json(hospital);
};

import { CampaniaSchema } from "../models/campania.model";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export const crearCampania = async (req: Request, res: Response) => {
  try {
    const data = CampaniaSchema.parse(req.body);
    const campania = await prisma.campania.create({ data });
    res.json(campania);
  } catch (error) {
    const err = error as any;
    res.status(400).json({ error: err.errors || err.message });
  }
};

export const obtenerCampanias = async (req: Request, res: Response) => {
  const campanias = await prisma.campania.findMany({
    include: { hospital: true },
  });
  res.json(campanias);
};

export const obtenerCampania = async (req: Request, res: Response) => {
  const { id } = req.params;
  const campania = await prisma.campania.findUnique({
    where: { id: Number(id) },
    include: { hospital: true },
  });
  if (!campania) return res.status(404).json({ error: "Campaña no encontrada" });
  res.json(campania);
};

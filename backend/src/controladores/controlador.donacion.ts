import { DonacionSchema } from "../models/donacion.model";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export const crearDonacion = async (req: Request, res: Response) => {
  try {
    const data = DonacionSchema.parse(req.body);
    const donacion = await prisma.donacion.create({ data });
    res.json(donacion);
  } catch (error) {
    const err = error as any;
    res.status(400).json({ error: err.errors || err.message });
  }
};

export const obtenerDonaciones = async (req: Request, res: Response) => {
  const donaciones = await prisma.donacion.findMany({
    include: { donante: true, campania: true },
  });
  res.json(donaciones);
};

export const obtenerDonacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const donacion = await prisma.donacion.findUnique({
    where: { id: Number(id) },
    include: { donante: true, campania: true },
  });
  if (!donacion) return res.status(404).json({ error: "Donación no encontrada" });
  res.json(donacion);
};

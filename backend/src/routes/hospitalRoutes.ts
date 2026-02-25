import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { AuthenticatedHospitalRequest } from "../middleware/authmiddleware";
import { requireAuthHospital } from "../middleware/authmiddleware";

const prisma = new PrismaClient();
const router = Router();

router.use(requireAuthHospital);

// Crear campaña (hospital autenticado)
router.post("/campanias", async (req, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, imagen_url, estado } = req.body;
    if (!nombre?.trim() || !ubicacion?.trim()) {
      return res.status(400).json({ error: "Nombre y ubicación son obligatorios" });
    }
    const campania = await prisma.campania.create({
      data: {
        nombre: nombre.trim(),
        descripcion: descripcion?.trim() || undefined,
        fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : new Date(),
        fecha_fin: fecha_fin ? new Date(fecha_fin) : undefined,
        ubicacion: ubicacion.trim(),
        imagen_url: imagen_url?.trim() || undefined,
        estado: estado && ["Activa", "Finalizada", "Cancelada"].includes(estado) ? estado : "Activa",
        hospitalId: typedReq.hospitalId,
      },
    });
    res.status(201).json(campania);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la campaña" });
  }
});

// Listar campañas del hospital autenticado
router.get("/mis-campanias", async (req, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  try {
    const campanias = await prisma.campania.findMany({
      where: { hospitalId: typedReq.hospitalId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { inscripciones: true } },
      },
    });
    res.json(campanias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las campañas" });
  }
});

// Actualizar campaña (solo si pertenece al hospital)
router.patch("/campanias/:id", async (req, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Id inválido" });

  try {
    const campania = await prisma.campania.findUnique({ where: { id } });
    if (!campania || campania.hospitalId !== typedReq.hospitalId) {
      return res.status(404).json({ error: "Campaña no encontrada o no autorizada" });
    }

    const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, imagen_url, estado } = req.body;
    const data: Record<string, unknown> = {};
    if (nombre != null) data.nombre = nombre;
    if (descripcion != null) data.descripcion = descripcion;
    if (fecha_inicio != null) data.fecha_inicio = new Date(fecha_inicio);
    if (fecha_fin != null) data.fecha_fin = new Date(fecha_fin);
    if (ubicacion != null) data.ubicacion = ubicacion;
    if (imagen_url != null) data.imagen_url = imagen_url;
    if (estado != null && ["Activa", "Finalizada", "Cancelada"].includes(estado)) data.estado = estado;

    const actualizada = await prisma.campania.update({
      where: { id },
      data,
    });
    res.json(actualizada);
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "P2025") return res.status(404).json({ error: "Campaña no encontrada" });
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la campaña" });
  }
});

// Ver inscripciones (pacientes registrados) de una campaña del hospital
router.get("/campanias/:id/inscripciones", async (req, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Id inválido" });

  try {
    const campania = await prisma.campania.findUnique({
      where: { id },
      include: { inscripciones: true },
    });
    if (!campania || campania.hospitalId !== typedReq.hospitalId) {
      return res.status(404).json({ error: "Campaña no encontrada o no autorizada" });
    }
    res.json({ campania: { id: campania.id, nombre: campania.nombre }, inscripciones: campania.inscripciones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las inscripciones" });
  }
});

export default router;

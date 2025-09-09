import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Crear usuario (Donante)
router.post("/usuarios", async (req, res) => {
  try {
    const { dni, nombre, apellido, email, password, grupo_sanguineo, factor_rh, fecha_nacimiento, sexo } = req.body;
    if (!dni || !nombre || !apellido || !email || !password || !grupo_sanguineo || !factor_rh || !fecha_nacimiento || !sexo) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const user = await prisma.donante.create({
      data: { dni, nombre, apellido, email, password, grupo_sanguineo, factor_rh, fecha_nacimiento: new Date(fecha_nacimiento), sexo },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Crear campania
router.post("/campanias", async (req, res) => {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, hospitalId } = req.body;
    if (!nombre || !fecha_inicio || !ubicacion || !hospitalId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const campania = await prisma.campania.create({
      data: { nombre, descripcion, fecha_inicio: new Date(fecha_inicio), fecha_fin: fecha_fin ? new Date(fecha_fin) : null, ubicacion, hospitalId },
    });
    res.json(campania);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear campaña" });
  }
});

router.post("/hospitales", async (req, res) => {
  try {
    const { nombre, direccion, telefono } = req.body;
    if (!nombre || !direccion || !telefono) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const hospital = await prisma.hospital.create({
      data: { nombre, direccion, telefono: Number(telefono) },
    });
    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear hospital" });
  }
});

// Listar usuarios
router.get("/usuarios", async (req, res) => {
  const users = await prisma.donante.findMany();
  res.json(users);
});

router.get("/hospitales", async (req, res) => {
  const hospitales = await prisma.hospital.findMany();
  res.json(hospitales);
});
export default router;

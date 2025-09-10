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
    const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, imagen_url, estado, hospitalId } = req.body;
    if (!nombre || !fecha_inicio || !ubicacion || !hospitalId || !estado) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const campania = await prisma.campania.create({
      data: {
        nombre,
        descripcion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: fecha_fin ? new Date(fecha_fin) : null,
        ubicacion,
        imagen_url: imagen_url || undefined,
        estado,
        hospitalId: Number(hospitalId)
      },
    });
    res.json(campania);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear campaña" });
  }
});

router.post("/hospitales", async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, tipo, horario_atencion } = req.body;
    if (!nombre || !direccion || !telefono || !email || !tipo || !horario_atencion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const hospital = await prisma.hospital.create({
      data: { nombre, direccion, telefono: Number(telefono), email, tipo, horario_atencion },
    });
    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear hospital" });
  }
});

router.post("/donaciones", async (req, res) => {
  try {
    const { DonanteId, hospitalId, fecha_donacion, tipo_donacion, estado, observaciones, campaniaId } = req.body;
    if (!DonanteId || !hospitalId || !fecha_donacion || !tipo_donacion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const donacion = await prisma.donacion.create({
      data: {
        DonanteId: Number(DonanteId),
        hospitalId: Number(hospitalId),
        fecha_donacion: new Date(fecha_donacion),
        tipo_donacion,
        estado: estado || undefined,
        observaciones: observaciones || undefined,
        campaniaId: campaniaId ? Number(campaniaId) : undefined
      },
    });
    res.json(donacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear donación" });
  }
});

// Listar usuarios
router.get("/usuarios", async (req, res) => {
  const users = await prisma.donante.findMany();
  res.json(users);
});

router.get("/campanias", async (req, res) => {
  const campanias = await prisma.campania.findMany({
    include: { hospital: true }
  });
  res.json(campanias);
});

router.get("/hospitales", async (req, res) => {
  const hospitales = await prisma.hospital.findMany();
  res.json(hospitales);
});

router.get("/donantes", async (req, res) => {
  const donantes = await prisma.donante.findMany();
  res.json(donantes);
});

export default router;
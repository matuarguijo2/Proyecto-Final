import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Crear usuario
router.post("/", async (req, res) => {
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

// Listar usuarios
router.get("/", async (req, res) => {
  const users = await prisma.donante.findMany();
  res.json(users);
});

export default router;

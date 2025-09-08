import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { dni, nombre, apellido, email, password, rol } = req.body;
    const user = await prisma.donante.create({
      data: { dni, nombre, apellido, email, password, rol },
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

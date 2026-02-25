import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { verificarAccesoToken } from "../utilidades/token";

const prisma = new PrismaClient();
const router = Router();

/** Tipo para campaña con campos de titularidad (el cliente Prisma puede no tenerlos si no se regeneró tras la migración) */
type CampaniaOwner = { id: number; hospitalId: number | null; creadorDonanteId: number | null };

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

// Crear campania (soporta formato organizador y formato hospital)
router.post("/campanias", async (req, res) => {
  try {
    const body = req.body;
    let creadorDonanteId: number | undefined;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      try {
        const payload = verificarAccesoToken(token);
        if (payload.tipo === "donante" && payload.usuarioId != null) {
          creadorDonanteId = Number(payload.usuarioId);
        }
      } catch {
        // token inválido, seguir sin creadorDonanteId
      }
    }

    // Formato organizador (formulario público)
    if (body.tituloAsunto !== undefined) {
      const {
        nombreApellido,
        dni,
        grupoSanguineoRh,
        cantidadDadores,
        nombreCentro,
        direccionCompleta,
        horariosDias,
        fechaLimiteAnio,
        fechaLimiteMes,
        fechaLimiteDia,
        tituloAsunto,
        descripcionRequisitos,
        telefonoEmailOrganizador,
        imagenUrl,
        hospitalId: hospitalIdBody,
      } = body;

      if (!tituloAsunto || !nombreApellido || !dni || !nombreCentro || !direccionCompleta || !horariosDias || !fechaLimiteAnio || !fechaLimiteMes || !fechaLimiteDia || !descripcionRequisitos || !telefonoEmailOrganizador) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      const mes = parseInt(fechaLimiteMes, 10);
      const fechaLimite = new Date(parseInt(fechaLimiteAnio, 10), mes, parseInt(fechaLimiteDia, 10));

      const campania = await prisma.campania.create({
        data: {
          nombre: tituloAsunto,
          descripcion: descripcionRequisitos,
          fecha_fin: fechaLimite,
          ubicacion: direccionCompleta,
          imagen_url: imagenUrl || undefined,
          nombreApellidoReceptor: nombreApellido,
          dniReceptor: dni,
          grupoSanguineoRh: grupoSanguineoRh || undefined,
          cantidadDadores: cantidadDadores || undefined,
          nombreCentro,
          direccionCompleta,
          horariosDias,
          telefonoEmailOrganizador,
          ...(hospitalIdBody != null && Number.isInteger(Number(hospitalIdBody)) && { hospitalId: Number(hospitalIdBody) }),
          ...(creadorDonanteId != null && Number.isInteger(creadorDonanteId) && { creadorDonanteId }),
        },
      });
      return res.json(campania);
    }

    // Formato hospital (admin)
    const { nombre, descripcion, fecha_inicio, fecha_fin, ubicacion, imagen_url, estado, hospitalId } = body;
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
        hospitalId: Number(hospitalId),
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
    where: { estado: "Activa" },
    include: {
      hospital: true,
      _count: { select: { inscripciones: true } },
    },
  });
  res.json(campanias);
});

// Obtener una campaña por id
router.get("/campanias/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Id inválido" });
    }
    const campania = await prisma.campania.findUnique({
      where: { id },
      include: {
        hospital: true,
        _count: { select: { inscripciones: true } },
      },
    });
    if (!campania) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }
    res.json(campania);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la campaña" });
  }
});

// Inscribirse en una campaña (aumenta la barra de progreso; si se llega a la meta, la campaña pasa a Finalizada)
router.post("/campanias/:id/inscribir", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Id inválido" });
    }
    const { email } = req.body;
    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ error: "El email es obligatorio" });
    }
    const emailNorm = email.trim().toLowerCase();
    const campania = await prisma.campania.findUnique({
      where: { id },
      include: { _count: { select: { inscripciones: true } } },
    });
    if (!campania) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }
    if (campania.estado !== "Activa") {
      return res.status(400).json({ error: "La campaña ya no acepta inscripciones" });
    }
    const meta = parseInt(campania.cantidadDadores || "0", 10);
    if (meta <= 0) {
      return res.status(400).json({ error: "Esta campaña no tiene meta de dadores definida" });
    }
    await prisma.inscripcionCampania.upsert({
      where: {
        campaniaId_email: { campaniaId: id, email: emailNorm },
      },
      create: { campaniaId: id, email: emailNorm },
      update: {},
    });
    const nuevaCuenta = await prisma.inscripcionCampania.count({
      where: { campaniaId: id },
    });
    if (nuevaCuenta >= meta) {
      await prisma.campania.update({
        where: { id },
        data: { estado: "Finalizada" },
      });
    }
    const campaniaActualizada = await prisma.campania.findUnique({
      where: { id },
      include: {
        hospital: true,
        _count: { select: { inscripciones: true } },
      },
    });
    return res.json({
      inscripciones: nuevaCuenta,
      meta,
      completada: nuevaCuenta >= meta,
      campania: campaniaActualizada,
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2002") {
      const id = parseInt(req.params.id, 10);
      const campania = await prisma.campania.findUnique({
        where: { id },
        include: { _count: { select: { inscripciones: true } } },
      });
      const meta = campania ? parseInt(campania.cantidadDadores || "0", 10) : 0;
      const inscripciones = campania?._count?.inscripciones ?? 0;
      return res.status(200).json({
        message: "Ya estabas inscrito en esta campaña",
        inscripciones,
        meta,
        completada: inscripciones >= meta,
        campania,
      });
    }
    console.error(error);
    return res.status(500).json({ error: "Error al inscribirse" });
  }
});

// Actualizar campaña (formato organizador, mismos campos que crear). Solo el creador (donante o institución) puede modificar.
router.patch("/campanias/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Id inválido" });
    }
    const campania = await prisma.campania.findUnique({
      where: { id },
      select: { id: true, hospitalId: true, creadorDonanteId: true } as Record<string, boolean>,
    }) as CampaniaOwner | null;
    if (!campania) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let isOwner = false;
    if (token) {
      try {
        const payload = verificarAccesoToken(token);
        if (payload.tipo === "donante" && payload.usuarioId != null) {
          isOwner = campania.creadorDonanteId === Number(payload.usuarioId);
        } else if (payload.tipo === "hospital" && payload.hospitalId != null) {
          isOwner = campania.hospitalId === payload.hospitalId;
        }
      } catch {
        // token inválido
      }
    }
    if (!isOwner) {
      return res.status(403).json({ error: "Solo el usuario o la institución que creó la campaña puede modificarla" });
    }

    const body = req.body;
    const {
      nombreApellido,
      dni,
      grupoSanguineoRh,
      cantidadDadores,
      nombreCentro,
      direccionCompleta,
      horariosDias,
      fechaLimiteAnio,
      fechaLimiteMes,
      fechaLimiteDia,
      tituloAsunto,
      descripcionRequisitos,
      telefonoEmailOrganizador,
      imagenUrl,
    } = body;

    if (!tituloAsunto || !nombreApellido || !dni || !nombreCentro || !direccionCompleta || !horariosDias || !fechaLimiteAnio || !fechaLimiteMes || !fechaLimiteDia || !descripcionRequisitos || !telefonoEmailOrganizador) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const mes = parseInt(fechaLimiteMes, 10);
    const fechaLimite = new Date(parseInt(fechaLimiteAnio, 10), mes, parseInt(fechaLimiteDia, 10));

    const actualizada = await prisma.campania.update({
      where: { id },
      data: {
        nombre: tituloAsunto,
        descripcion: descripcionRequisitos,
        fecha_fin: fechaLimite,
        ubicacion: direccionCompleta,
        imagen_url: imagenUrl !== undefined ? (imagenUrl || null) : undefined,
        nombreApellidoReceptor: nombreApellido,
        dniReceptor: dni,
        grupoSanguineoRh: grupoSanguineoRh || undefined,
        cantidadDadores: cantidadDadores || undefined,
        nombreCentro,
        direccionCompleta,
        horariosDias,
        telefonoEmailOrganizador,
      },
    });
    return res.json(actualizada);
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025") {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar la campaña" });
  }
});

// Eliminar campaña. Solo el creador (donante o institución) puede eliminar.
router.delete("/campanias/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Id inválido" });
    }
    const campania = await prisma.campania.findUnique({
      where: { id },
      select: { id: true, hospitalId: true, creadorDonanteId: true } as Record<string, boolean>,
    }) as CampaniaOwner | null;
    if (!campania) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let isOwner = false;
    if (token) {
      try {
        const payload = verificarAccesoToken(token);
        if (payload.tipo === "donante" && payload.usuarioId != null) {
          isOwner = campania.creadorDonanteId === Number(payload.usuarioId);
        } else if (payload.tipo === "hospital" && payload.hospitalId != null) {
          isOwner = campania.hospitalId === payload.hospitalId;
        }
      } catch {
        // token inválido
      }
    }
    if (!isOwner) {
      return res.status(403).json({ error: "Solo el usuario o la institución que creó la campaña puede eliminarla" });
    }

    await prisma.campania.delete({
      where: { id }
    });
    return res.status(204).send();
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025") {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar la campaña" });
  }
});

router.get("/hospitales", async (req, res) => {
  const hospitales = await prisma.hospital.findMany({
    where: {
      isActive: true,
      OR: [
        { direccion: { contains: "Tucumán", mode: "insensitive" } },
        { direccion: { contains: "tucuman", mode: "insensitive" } },
        { direccion: { contains: "San Miguel de Tucumán", mode: "insensitive" } },
      ],
      NOT: {
        direccion: { contains: "Mendoza", mode: "insensitive" },
      },
    },
    orderBy: { nombre: "asc" },
  });
  res.json(hospitales);
});

router.patch("/hospitales/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Id inválido" });
    }
    const { latitude, longitude } = req.body;
    if (latitude == null || longitude == null || typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ error: "Se requieren latitude y longitude numéricos" });
    }
    const hospital = await prisma.hospital.update({
      where: { id },
      data: { latitude, longitude },
    });
    return res.json(hospital);
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code: string }).code === "P2025") {
      return res.status(404).json({ error: "Hospital no encontrado" });
    }
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el hospital" });
  }
});

router.get("/donaciones", async (req, res) => {
  try {
    const donaciones = await prisma.donacion.findMany({
      include: { donante: true, campania: true, hospital: true }
    });
    res.json(donaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener donaciones" });
  }
});

export default router;
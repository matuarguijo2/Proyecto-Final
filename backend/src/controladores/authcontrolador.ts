import { Request, Response } from "express";
import * as AuthService from '../servicios/servicio';
import AuthenticatedRequest from "../middleware/authmiddleware";
import { PrismaClient, Prisma, GrupoSanguineo, FactorRH, Sexo } from "@prisma/client";
import { comparePassword, hashPassword } from "../utilidades/contrasenia";


const prisma = new PrismaClient();

/** Tipo para campaña con creadorDonanteId (por si el cliente Prisma no se regeneró tras la migración) */
type CampaniaConCreador = { id: number; creadorDonanteId: number | null; [k: string]: unknown };

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, dni, nombre, apellido, grupo_sanguineo, factor_rh, fecha_nacimiento, sexo } = req.body;

    if (!email || !password || !dni || !nombre || !apellido || !grupo_sanguineo || !factor_rh || !fecha_nacimiento || !sexo) {
      return res.status(400).json({ error: "Faltan Campos Requeridos" });
    }

    const { accessToken, refreshToken } = await AuthService.signup(
        email,
        password,
        dni,
        nombre,
        apellido,
        grupo_sanguineo,
        factor_rh,
        fecha_nacimiento,
        sexo
     );

     res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ accessToken });
  } catch (error: any) {
    if (error?.code === "P2002") {
      const target = (error?.meta?.target as string[] | undefined)?.[0];
      if (target === "dni") return res.status(400).json({ error: "Ya existe un donante registrado con ese DNI" });
      if (target === "email") return res.status(400).json({ error: "Ya existe una cuenta con ese correo electrónico" });
      return res.status(400).json({ error: "Los datos ingresados ya están en uso" });
    }
    const status = error?.status || 400;
    return res.status(status).json({ error: error?.message || "Error en el registro" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Faltan Campos Requeridos" });
    }

    const { accessToken, refreshToken } = await AuthService.login(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    const status = error?.status || 400;
    return res.status(status).json({ error: error?.message || "Error en el inicio de sesión" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Error al cerrar sesión" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó refresh token" });
    }
    // Espera la promesa correctamente
    const { accessToken, refreshToken } = await AuthService.refreshAccessToken(token);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    const status = error?.status || 400;
    return res.status(status).json({ error: error?.message || "Error al refrescar el token" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "El email es obligatorio" });
    }

    await AuthService.forgotPassword(email);

    return res.status(200).json({ message: "Si el correo existe, se ha enviado un enlace de restablecimiento de contraseña." });
  } catch (error: any) {
    const status = error?.status || 400;
    return res.status(status).json({ error: error?.message || "Error al enviar el enlace de restablecimiento de contraseña" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: "Faltan Campos Requeridos" });
    }

    await AuthService.resetPassword(token, newPassword);

    return res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error: any) {
    const status = error?.status || 400;
    return res.status(status).json({ error: error?.message || "Error al restablecer la contraseña" });
  }
};



// Obtener perfil del usuario autenticado
export const getMe = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const usuario = await prisma.donante.findUnique({
      where: { id: typedReq.usuarioId },
      select: {
        id: true,
        dni: true,
        nombre: true,
        apellido: true,
        email: true,
        grupo_sanguineo: true,
        factor_rh: true,
        fecha_nacimiento: true,
        sexo: true,
        isActive: true,
        estado: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};

// Actualizar perfil del usuario (sin password)
export const updateMe = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  const { nombre, apellido, grupo_sanguineo, factor_rh, fecha_nacimiento, sexo } = req.body;
  try {
    const data: Prisma.DonanteUpdateInput = {};
    if (nombre != null) data.nombre = nombre;
    if (apellido != null) data.apellido = apellido;
    if (fecha_nacimiento != null) data.fecha_nacimiento = new Date(fecha_nacimiento);
    if (grupo_sanguineo != null && ["A", "B", "AB", "O"].includes(grupo_sanguineo)) {
      data.grupo_sanguineo = grupo_sanguineo as GrupoSanguineo;
    }
    if (factor_rh != null && ["positivo", "negativo"].includes(factor_rh)) {
      data.factor_rh = factor_rh as FactorRH;
    }
    if (sexo != null && ["Masculino", "Femenino"].includes(sexo)) {
      data.sexo = sexo as Sexo;
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }
    const usuario = await prisma.donante.update({
      where: { id: typedReq.usuarioId },
      data,
    });
    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};

// Cambiar contraseña
export const changePassword = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  const { oldPassword, newPassword } = req.body;
  try {
    const usuario = await prisma.donante.findUnique({ 
      where: { id: typedReq.usuarioId },
      select: { password: true }
    }) as { password: string | null } | null;
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    if (!usuario.password) return res.status(400).json({ error: "No se puede cambiar la contraseña, usuario sin contraseña registrada" });

    const valid = await comparePassword(oldPassword, usuario.password);
    if (!valid) return res.status(400).json({ error: "Contraseña actual incorrecta" });

    const hashed = await hashPassword(newPassword);
    await prisma.donante.update({
      where: { id: typedReq.usuarioId },
      data: { password: hashed }
    });
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

// Listar donaciones del usuario
export const getMisDonaciones = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const donaciones = await prisma.donacion.findMany({
      where: { DonanteId: Number(typedReq.usuarioId) }
    });
    res.json(donaciones);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener las donaciones" });
  }
};

// Crear donación
export const crearDonacion = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const { fecha_donacion, tipo_donacion, observaciones, estado, campaniaId, hospitalId } = req.body;
    if (!fecha_donacion || !tipo_donacion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }
    // Usa el nombre correcto del campo de relación en tu modelo Prisma
    const donacion = await prisma.donacion.create({
      data: {
        fecha_donacion: new Date(fecha_donacion),
        tipo_donacion,
        observaciones: observaciones || undefined,
        estado: estado || undefined,
        campaniaId: campaniaId ? Number(campaniaId) : undefined,
        hospitalId: hospitalId ? Number(hospitalId) : undefined,
        DonanteId: Number(typedReq.usuarioId)
      }
    });
    res.status(201).json(donacion);
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear la donación" });
  }
};

// Actualizar donación
export const actualizarDonacion = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  const { id } = req.params;
  const { fecha_donacion, tipo_donacion, observaciones, estado, campaniaId, hospitalId } = req.body;
  try {
    const donacion = await prisma.donacion.findUnique({ where: { id: Number(id) } });
    if (!donacion || donacion.DonanteId !== Number(typedReq.usuarioId)) {
      return res.status(404).json({ error: "Donación no encontrada o no autorizada" });
    }
    const actualizada = await prisma.donacion.update({
      where: { id: Number(id) },
      data: {
        fecha_donacion: fecha_donacion ? new Date(fecha_donacion) : donacion.fecha_donacion,
        tipo_donacion: tipo_donacion || donacion.tipo_donacion,
        observaciones: observaciones || donacion.observaciones,
        estado: estado || donacion.estado,
        campaniaId: campaniaId ? Number(campaniaId) : donacion.campaniaId,
        hospitalId: hospitalId ? Number(hospitalId) : donacion.hospitalId
      }
    });
    res.json(actualizada);
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar la donación" });
  }
};

export const eliminarDonacion = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  const { id } = req.params;
  try {
    const donacion = await prisma.donacion.findUnique({ where: { id: Number(id) } });
    if (!donacion || donacion.DonanteId !== Number(typedReq.usuarioId)) {
      return res.status(404).json({ error: "Donación no encontrada o no autorizada" });
    }
    await prisma.donacion.delete({ where: { id: Number(id) } });
    res.json({ message: "Donación eliminada correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar la donación" });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  try {
    await prisma.donacion.deleteMany({ where: { DonanteId: Number(typedReq.usuarioId) } });
    await prisma.donante.delete({ where: { id: Number(typedReq.usuarioId) } });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// --- Campañas creadas por el donante (organizador) ---

export const getMisCampanias = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const campanias = await prisma.campania.findMany({
      where: { creadorDonanteId: typedReq.usuarioId } as Record<string, unknown>,
      include: { _count: { select: { inscripciones: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(campanias);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener las campañas" });
  }
};

export const updateMiCampania = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Id inválido" });
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

  try {
    const existente = await prisma.campania.findUnique({ where: { id } }) as CampaniaConCreador | null;
    if (!existente || existente.creadorDonanteId !== typedReq.usuarioId) {
      return res.status(404).json({ error: "Campaña no encontrada o no autorizada" });
    }
    const mes = parseInt(fechaLimiteMes, 10);
    const fechaLimite = new Date(parseInt(fechaLimiteAnio, 10), mes, parseInt(fechaLimiteDia, 10));
    const campania = await prisma.campania.update({
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
    return res.json(campania);
  } catch (error: any) {
    if (error?.code === "P2025") return res.status(404).json({ error: "Campaña no encontrada" });
    res.status(500).json({ error: "Error al actualizar la campaña" });
  }
};

export const getInscripcionesMiCampania = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedRequest;
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Id inválido" });
  try {
    const campania = await prisma.campania.findUnique({
      where: { id },
      select: { creadorDonanteId: true } as Record<string, boolean>,
    }) as CampaniaConCreador | null;
    if (!campania || campania.creadorDonanteId !== typedReq.usuarioId) {
      return res.status(404).json({ error: "Campaña no encontrada o no autorizada" });
    }
    const inscripciones = await prisma.inscripcionCampania.findMany({
      where: { campaniaId: id },
      orderBy: { createdAt: "desc" },
    });
    res.json(inscripciones);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener las inscripciones" });
  }
};
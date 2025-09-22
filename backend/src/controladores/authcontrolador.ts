import { Request, Response } from "express";
import * as AuthService from '../servicios/servicio';
import AuthenticatedRequest from "../middleware/authmiddleware";
import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utilidades/contrasenia";


const prisma = new PrismaClient();

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
      where: { id: typedReq.usuarioId }
    });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: "Error al obtener el perfil" });
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
}
import { Request, Response } from "express";
import * as AuthHospitalService from "../servicios/servicioHospital";
import type { AuthenticatedHospitalRequest } from "../middleware/authmiddleware";
import { PrismaClient, Prisma, TipoHospital } from "@prisma/client";
import { comparePassword, hashPassword } from "../utilidades/contrasenia";

const prisma = new PrismaClient();

export const signupHospital = async (req: Request, res: Response) => {
  try {
    const {
      usuario,
      password,
      nombre,
      direccion,
      telefono,
      email,
      tipo,
      horario_atencion,
      latitude,
      longitude,
    } = req.body;

    if (!usuario || !password || !nombre || !direccion || telefono == null || !email || !tipo || !horario_atencion) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const { accessToken, refreshToken } = await AuthHospitalService.signupHospital(
      usuario,
      password,
      nombre,
      direccion,
      Number(telefono),
      email,
      tipo,
      horario_atencion,
      latitude != null ? Number(latitude) : undefined,
      longitude != null ? Number(longitude) : undefined
    );

    res.cookie("refreshTokenHospital", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ accessToken });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; status?: number };
    if (err?.code === "P2002") {
      return res.status(400).json({ error: "El nombre de usuario o el correo ya están en uso" });
    }
    return res.status(err?.status ?? 400).json({ error: err?.message ?? "Error en el registro" });
  }
};

export const loginHospital = async (req: Request, res: Response) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
    }

    const { accessToken, refreshToken } = await AuthHospitalService.loginHospital(usuario, password);

    res.cookie("refreshTokenHospital", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error: unknown) {
    console.error("[loginHospital]", error);
    const err = error as { message?: string; status?: number };
    const status = err?.status ?? 401;
    return res.status(status).json({ error: err?.message ?? "Error en el inicio de sesión" });
  }
};

export const logoutHospital = (req: Request, res: Response) => {
  res.clearCookie("refreshTokenHospital", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

export const refreshTokenHospital = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshTokenHospital;
    if (!token) return res.status(401).json({ error: "No se proporcionó refresh token" });

    const { accessToken, refreshToken } = AuthHospitalService.refreshAccessTokenHospital(token);

    res.cookie("refreshTokenHospital", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return res.status(401).json({ error: err?.message ?? "Token inválido o expirado" });
  }
};

export const getMeHospital = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id: typedReq.hospitalId },
      select: {
        id: true,
        nombre: true,
        direccion: true,
        telefono: true,
        email: true,
        tipo: true,
        horario_atencion: true,
        isActive: true,
        latitude: true,
        longitude: true,
        usuario: true,
        createdAt: true,
      },
    });
    if (!hospital) return res.status(404).json({ error: "Hospital no encontrado" });
    res.json(hospital);
  } catch {
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};

export const updateMeHospital = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  const { nombre, direccion, telefono, email, tipo, horario_atencion, latitude, longitude } = req.body;
  try {
    const data: Prisma.HospitalUpdateInput = {};
    if (nombre != null) data.nombre = nombre;
    if (direccion != null) data.direccion = direccion;
    if (telefono != null) data.telefono = Number(telefono);
    if (email != null) data.email = email;
    if (horario_atencion != null) data.horario_atencion = horario_atencion;
    if (latitude != null) data.latitude = Number(latitude);
    if (longitude != null) data.longitude = Number(longitude);
    if (tipo != null && ["Publico", "Privado"].includes(tipo)) {
      data.tipo = tipo as TipoHospital;
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }
    const hospital = await prisma.hospital.update({
      where: { id: typedReq.hospitalId! },
      data,
    });
    const { password: _p, ...rest } = hospital as { password: string | null; [k: string]: unknown };
    res.json(rest);
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err?.code === "P2002") return res.status(400).json({ error: "El correo ya está en uso" });
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};

export const changePasswordHospital = async (req: Request, res: Response) => {
  const typedReq = req as AuthenticatedHospitalRequest;
  const { oldPassword, newPassword } = req.body;
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id: typedReq.hospitalId },
      select: { password: true },
    });
    if (!hospital?.password) return res.status(400).json({ error: "No se puede cambiar la contraseña" });

    const valid = await comparePassword(oldPassword, hospital.password);
    if (!valid) return res.status(400).json({ error: "Contraseña actual incorrecta" });

    const hashed = await hashPassword(newPassword);
    await prisma.hospital.update({
      where: { id: typedReq.hospitalId! },
      data: { password: hashed },
    });
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch {
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

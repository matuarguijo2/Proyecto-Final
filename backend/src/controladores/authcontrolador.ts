import { Request, Response } from "express";
import * as AuthService from '../servicios/servicio';

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
    
    const { accessToken, refreshToken } = AuthService.refreshAccessToken(token);

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
import { Request, Response } from "express";
import * as AuthService from '../servicios/servicio';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, dni, nombre, apellido, grupo_sanguineo, fator_rh, fecha_nacimiento, sexo } = req.body;

    if (!email || !password || !dni || !nombre || !apellido) {
      return res.status(400).json({ error: "Faltan Campos Requeridos" });
    }

    const { accessToken, refreshToken } = await AuthService.signup(
        email,
        password,
        dni,
        nombre,
        apellido,
        grupo_sanguineo,
        fator_rh, // Updated parameter name
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
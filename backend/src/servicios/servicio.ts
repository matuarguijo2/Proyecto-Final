import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateAccessToken, generateRefreshToken } from "../utilidades/tokens.ts"

const prisma = new PrismaClient(); // Fixed variable name to avoid conflict with import

export const signup = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Email y contraseña son obligatorios");

    const existing = await prisma.donante.findUnique({ where: { email } });
    if (existing) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.donante.create({
        data: { 
            email, 
            password: hashedPassword,
            dni: "00000000",
            nombre: "Nombre",
            apellido: "Apellido",
            grupo_sanguineo: "O",
            factor_rh: "positivo",
            fecha_nacimiento: new Date(),
            sexo: "Femenino"
        }
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { accessToken, refreshToken };
}
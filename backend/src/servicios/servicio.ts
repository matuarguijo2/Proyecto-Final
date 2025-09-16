import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateAccessToken, generateRefreshToken } from "../utilidades/tokens.ts"

const prisma = new PrismaClient(); // Fixed variable name to avoid conflict with import

export const signup = async (
    email: string, 
    password: string,
    dni: string,
    nombre: string,
    apellido: string,
    grupo_sanguineo: grupo_sanguineo as GrupoSanguineo,
    factor_rh: factor_rh as FactorRH,
    fecha_nacimiento: fecha_nacimiento as Date,
    sexo: sexo as Sexo
) => {
    if (!email || !password || !dni || !nombre || !apellido || !grupo_sanguineo || !factor_rh || !fecha_nacimiento || !sexo) {
        throw new Error("Todos los campos son obligatorios");
    }

    const existing = await prisma.donante.findUnique({ where: { email } });
    if (existing) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.donante.create({
        data: { 
            email, 
            password: hashedPassword,
            dni,
            nombre,
            apellido,
            grupo_sanguineo,
            factor_rh,
            fecha_nacimiento,
            sexo
        }
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { accessToken, refreshToken };
}
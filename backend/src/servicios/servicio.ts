import { comparePassword, hashPassword } from "../utilidades/contrasenia";
import { PrismaClient, GrupoSanguineo, FactorRH, Sexo } from "@prisma/client";
import { generarToken, generarRefreshToken } from "../utilidades/token";

const prisma = new PrismaClient();

function parseGrupo(v: string): GrupoSanguineo {
  const x = v.toUpperCase();
  if (x === "A" || x === "B" || x === "AB" || x === "O") return x as GrupoSanguineo;
  throw new Error("grupo_sanguineo inválido");
}

function parseRH(v: string): FactorRH {
  const x = v.toLowerCase();
  if (x === "positivo" || x === "negativo") return x as FactorRH;
  throw new Error("factor_rh inválido");
}

function parseSexo(v: string): Sexo {
  const x = v.toLowerCase();
  if (x === "masculino") return "Masculino";
  if (x === "femenino") return "Femenino";
  throw new Error("sexo inválido");
}

export const signup = async (
  email: string,
  password: string,
  dni: string,
  nombre: string,
  apellido: string,
  grupo_sanguineo: string,
  factor_rh: string,
  fecha_nacimiento: string | Date,
  sexo: string
) => {
  if (!email || !password || !dni || !nombre || !apellido || !grupo_sanguineo || !factor_rh || !fecha_nacimiento || !sexo) {
    throw new Error("Todos los campos son obligatorios");
  }

  const existing = await prisma.donante.findUnique({ where: { email } });
  if (existing) throw new Error("El usuario ya existe");

  const hashedPassword = await hashPassword(password);

  const grupo = parseGrupo(grupo_sanguineo);
  const rh = parseRH(factor_rh);
  const sexoEnum = parseSexo(sexo);
  const fecha = typeof fecha_nacimiento === "string" ? new Date(fecha_nacimiento) : fecha_nacimiento;
  if (isNaN(fecha.getTime())) throw new Error("La fecha de nacimiento es inválida o no está en el formato correcto");

  const user = await prisma.donante.create({
    data: {
      email,
      password: hashedPassword,
      dni,
      nombre,
      apellido,
      grupo_sanguineo: grupo,
      factor_rh: rh,
      fecha_nacimiento: fecha,
      sexo: sexoEnum
    }
  });

    const accessToken = generarToken(String(user.id));
    const refreshToken = generarRefreshToken(String(user.id));
    return { accessToken, refreshToken };
}

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  const user = await prisma.donante.findUnique({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new Error("Contraseña incorrecta");

  const accessToken = generarToken(String(user.id));
  const refreshToken = generarRefreshToken(String(user.id));
  return { accessToken, refreshToken };
};
import { comparePassword, hashPassword } from "../utilidades/contrasenia";
import { PrismaClient, TipoHospital } from "@prisma/client";
import { generarTokenHospital, generarRefreshTokenHospital, verificarRefreshTokenHospital } from "../utilidades/token";

const prisma = new PrismaClient();

function parseTipo(v: string): TipoHospital {
  const x = v?.toString().toLowerCase();
  if (x === "publico" || x === "privado") return x === "publico" ? "Publico" : "Privado";
  throw new Error("tipo inválido (Publico o Privado)");
}

export const signupHospital = async (
  usuario: string,
  password: string,
  nombre: string,
  direccion: string,
  telefono: number,
  email: string,
  tipo: string,
  horario_atencion: string,
  latitude?: number,
  longitude?: number
) => {
  if (!usuario?.trim() || !password || !nombre?.trim() || !direccion?.trim() || !email?.trim() || !tipo || !horario_atencion?.trim()) {
    throw new Error("Todos los campos obligatorios son requeridos");
  }

  const existingUsuario = await prisma.hospital.findUnique({ where: { usuario: usuario.trim() } });
  if (existingUsuario) throw new Error("Ya existe un hospital con ese nombre de usuario");

  const existingEmail = await prisma.hospital.findFirst({ where: { email: email.trim() } });
  if (existingEmail) throw new Error("Ya existe un hospital con ese correo electrónico");

  const hashedPassword = await hashPassword(password);
  const tipoEnum = parseTipo(tipo);

  const hospital = await prisma.hospital.create({
    data: {
      usuario: usuario.trim(),
      password: hashedPassword,
      nombre: nombre.trim(),
      direccion: direccion.trim(),
      telefono: Number(telefono),
      email: email.trim(),
      tipo: tipoEnum,
      horario_atencion: horario_atencion.trim(),
      latitude: latitude != null ? Number(latitude) : undefined,
      longitude: longitude != null ? Number(longitude) : undefined,
    },
  });

  const accessToken = generarTokenHospital(hospital.id);
  const refreshToken = generarRefreshTokenHospital(hospital.id);
  return { accessToken, refreshToken };
};

export const loginHospital = async (usuario: string, password: string) => {
  if (!usuario?.trim() || !password) {
    throw new Error("Usuario y contraseña son obligatorios");
  }

  const hospital = await prisma.hospital.findUnique({ where: { usuario: usuario.trim() } });
  if (!hospital || !hospital.password) throw new Error("Usuario o contraseña incorrectos");

  const isValidPassword = await comparePassword(password, hospital.password);
  if (!isValidPassword) throw new Error("Usuario o contraseña incorrectos");

  if (!hospital.isActive) throw new Error("Cuenta desactivada");

  const accessToken = generarTokenHospital(hospital.id);
  const refreshToken = generarRefreshTokenHospital(hospital.id);
  return { accessToken, refreshToken };
};

export const refreshAccessTokenHospital = (token: string) => {
  if (!token) throw new Error("Token es obligatorio");
  try {
    const payload = verificarRefreshTokenHospital(token);
    const newAccessToken = generarTokenHospital(payload.hospitalId);
    const newRefreshToken = generarRefreshTokenHospital(payload.hospitalId);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch {
    throw new Error("Token inválido o expirado");
  }
};

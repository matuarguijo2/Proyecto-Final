import jwt from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "secreto";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-secreto-hospital";

export const generarToken = (usuarioId: string) => {
  const token = jwt.sign({ usuarioId, tipo: "donante" }, ACCESS_SECRET, {
    expiresIn: "15min"
  });
  return token;
};

export const generarTokenHospital = (hospitalId: number) => {
  const token = jwt.sign({ hospitalId, tipo: "hospital" }, ACCESS_SECRET, {
    expiresIn: "7d"
  });
  return token;
};

export const generarRefreshToken = (usuarioId: string) => {
  const token = jwt.sign({ usuarioId }, REFRESH_SECRET, {
    expiresIn: "7d"
  });
  return token;
};

export const generarRefreshTokenHospital = (hospitalId: number) => {
  const token = jwt.sign({ hospitalId, tipo: "hospital" }, REFRESH_SECRET, {
    expiresIn: "7d"
  });
  return token;
};

export const verificarRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as {
    usuarioId: string;
  };
};

export const verificarRefreshTokenHospital = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as {
    hospitalId: number;
    tipo: string;
  };
};

export const verificarAccesoToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as {
    usuarioId?: string;
    hospitalId?: number;
    tipo?: string;
  };
};

export const verificarAccesoTokenHospital = (token: string) => {
  const payload = jwt.verify(token, ACCESS_SECRET) as {
    hospitalId?: number;
    tipo?: string;
  };
  if (payload.tipo !== "hospital" || payload.hospitalId == null) {
    throw new Error("Token no válido para hospital");
  }
  return payload;
};

export const generarResetToken = (usuarioId: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos
  return { token, expiresAt };
}
import jwt from "jsonwebtoken";

export const generarToken = (usuarioId: string) => {
  const token = jwt.sign({ usuarioId }, process.env.ACCESS_TOKEN_SECRET! || "secreto", {
    expiresIn: "15min"
  });
  return token;
};

export const generarRefreshToken = (usuarioId: string) => {
  const refreshToken = jwt.sign({ usuarioId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d"
  });
  return refreshToken;
}

export const verificarRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
    usuarioId: string;
  };
}

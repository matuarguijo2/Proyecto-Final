import { Request, Response, NextFunction } from "express";
import { verificarAccesoToken } from "../utilidades/token";

interface AuthenticatedRequest extends Request {
    usuarioId?: number;
}

export const requireAuth = (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token de acceso requerido" });
    }

    try {
        const payload = verificarAccesoToken(token);
        req.usuarioId = Number(payload.usuarioId);
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
};

export default AuthenticatedRequest;
import { Request, Response, NextFunction } from "express";
import { verificarAccesoToken, verificarAccesoTokenHospital } from "../utilidades/token";

export interface AuthenticatedRequest extends Request {
    usuarioId?: number;
}

export interface AuthenticatedHospitalRequest extends Request {
    hospitalId?: number;
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
        if (payload.tipo === "hospital" || payload.usuarioId == null) {
            return res.status(401).json({ error: "Token no válido para donante" });
        }
        req.usuarioId = Number(payload.usuarioId);
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
};

export const requireAuthHospital = (
    req: AuthenticatedHospitalRequest,
    res: Response,
    next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token de acceso requerido" });
    }

    try {
        const payload = verificarAccesoTokenHospital(token);
        req.hospitalId = payload.hospitalId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido o expirado" });
    }
};

export default AuthenticatedRequest;
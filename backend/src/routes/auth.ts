import { Router } from "express";
import {
    signup, 
    login, 
    logout, 
    refreshToken, 
    forgotPassword, 
    resetPassword,
    getMe,
    changePassword,
    getMisDonaciones,
    crearDonacion,
    actualizarDonacion,
    eliminarDonacion,
    eliminarUsuario
} from "../controladores/authcontrolador";
import AuthenticatedRequest, { requireAuth } from "../middleware/authmiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/getme", requireAuth, getMe);
router.post("/changepassword", requireAuth, changePassword);
router.get("/misdonaciones", requireAuth, getMisDonaciones);
router.post("/donacion", requireAuth, crearDonacion);
router.put("/donacion/:id", requireAuth, actualizarDonacion);
router.delete("/donacion/:id", requireAuth, eliminarDonacion);

// Eliminar usuario
router.delete("/usuario", requireAuth, eliminarUsuario);

router.get("/protected", requireAuth, (req, res) => {
    const typedReq = req as AuthenticatedRequest;
    res.json({ message: `Exitoso` });
});

router.get("/getme", requireAuth, async (req, res) => {
  const typedReq = req as AuthenticatedRequest;
  // Busca el usuario por typedReq.usuarioId y retorna sus datos
});

router.post("/changepassword", requireAuth, async (req, res) => {
  // Permite al usuario cambiar su contraseña actual
});

router.get("/misdonaciones", requireAuth, async (req, res) => {
  // Retorna las donaciones hechas por el usuario autenticado
});

export default router;
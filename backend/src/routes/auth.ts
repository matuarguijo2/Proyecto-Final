import { Router } from "express";
import {
    signup,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    getMe,
    updateMe,
    changePassword,
    getMisDonaciones,
    crearDonacion,
    actualizarDonacion,
    eliminarDonacion,
    eliminarUsuario,
    getMisCampanias,
    updateMiCampania,
    getInscripcionesMiCampania,
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
router.patch("/me", requireAuth, updateMe);
router.post("/changepassword", requireAuth, changePassword);
router.get("/misdonaciones", requireAuth, getMisDonaciones);
router.get("/mis-campanias", requireAuth, getMisCampanias);
router.patch("/campanias/:id", requireAuth, updateMiCampania);
router.get("/campanias/:id/inscripciones", requireAuth, getInscripcionesMiCampania);
router.post("/donacion", requireAuth, crearDonacion);
router.put("/donacion/:id", requireAuth, actualizarDonacion);
router.delete("/donacion/:id", requireAuth, eliminarDonacion);
router.delete("/usuario", requireAuth, eliminarUsuario);

router.get("/protected", requireAuth, (req, res) => {
    const typedReq = req as AuthenticatedRequest;
    res.json({ message: `Exitoso` });
});

export default router;
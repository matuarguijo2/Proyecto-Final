import { Router } from "express";
import {signup, login, logout, refreshToken, forgotPassword, resetPassword} from "../controladores/authcontrolador";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;
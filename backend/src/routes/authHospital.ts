import { Router } from "express";
import {
  signupHospital,
  loginHospital,
  logoutHospital,
  refreshTokenHospital,
  getMeHospital,
  updateMeHospital,
  changePasswordHospital,
} from "../controladores/authHospitalControlador";
import { requireAuthHospital } from "../middleware/authmiddleware";

const router = Router();

router.post("/signup", signupHospital);
router.post("/login", loginHospital);
router.post("/logout", logoutHospital);
router.post("/refresh-token", refreshTokenHospital);
router.get("/getme", requireAuthHospital, getMeHospital);
router.patch("/me", requireAuthHospital, updateMeHospital);
router.post("/changepassword", requireAuthHospital, changePasswordHospital);

export default router;

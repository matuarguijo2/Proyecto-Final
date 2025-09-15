import { Router } from "express";
import {signup} from "../controladores/authcontrolador.ts";

const router = Router();

router.post("/signup", signup);

export default router;
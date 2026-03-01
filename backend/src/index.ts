import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/auth";
import authHospitalRoutes from "./routes/authHospital";
import hospitalRoutes from "./routes/hospitalRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://localhost:5173", "http://localhost:4000", "http://proyecto-final-eight-beta.vercel.app"];
app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/auth/hospital", authHospitalRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api", userRoutes);
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(err?.status || 500).json({ error: err?.message || "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

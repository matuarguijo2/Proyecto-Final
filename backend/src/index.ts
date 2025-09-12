require('dotenv').config();
import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
dotenv.config();



const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Servidor corriendo con ts-node 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

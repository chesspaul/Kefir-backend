import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productosRoutes from "./routes/productosRoutes.js";
import contactosRoutes from "./routes/contactosRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usersRoutes);

app.use("/api/productos", productosRoutes);

app.use("/api/contactos", contactosRoutes);


app.listen(3000, () => {
  console.log("Servidor corriendo ");
});

app.use(errorHandler);
import express from "express";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productosController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getProductos);

// Rutas protegidas (solo admin)
router.post("/", protect, admin, crearProducto);
router.put("/:id", protect, admin, actualizarProducto);
router.delete("/:id", protect, admin, eliminarProducto);

export default router;
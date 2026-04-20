import express from "express";
import {
  crearContacto,
  getContactos
} from "../controllers/contactosController.js";

const router = express.Router();

router.post("/", crearContacto);
router.get("/", getContactos);

export default router;
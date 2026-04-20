import asyncHandler from "express-async-handler";
import Contacto from "../models/contactoModel.js";

// POST
export const crearContacto = asyncHandler(async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios");
  }

  const nuevo = await Contacto.create(req.body);

  res.status(201).json(nuevo);
});

// GET
export const getContactos = asyncHandler(async (req, res) => {
  const contactos = await Contacto.find();
  res.status(200).json(contactos);
});
import asyncHandler from "express-async-handler";
import Producto from "../models/productoModel.js";

// GET
export const getProductos = asyncHandler(async (req, res) => {
  const productos = await Producto.find();
  res.status(200).json(productos);
});

// POST
export const crearProducto = asyncHandler(async (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    res.status(400);
    throw new Error("Faltan datos obligatorios");
  }

  const nuevo = await Producto.create(req.body);

  res.status(201).json(nuevo);
});

// PUT
export const actualizarProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error("Producto no encontrado");
  }

  const actualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(actualizado);
});

// DELETE
export const eliminarProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    res.status(404);
    throw new Error("Producto no encontrado");
  }

  await Producto.deleteOne(producto);

  res.status(200).json({ mensaje: "Producto eliminado" });
});
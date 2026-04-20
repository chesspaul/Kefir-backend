import Producto from "../models/productoModel.js";

// GET todos
export const getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

// POST crear
export const crearProducto = async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
};

// PUT actualizar
export const actualizarProducto = async (req, res) => {
  const actualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(actualizado);
};

// DELETE eliminar
export const eliminarProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Producto eliminado" });
};
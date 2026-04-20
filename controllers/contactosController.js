import Contacto from "../models/contactoModel.js";

// POST → guardar mensaje
export const crearContacto = async (req, res) => {
  const nuevo = new Contacto(req.body);
  await nuevo.save();
  res.json(nuevo);
};

// GET → ver todos (admin)
export const getContactos = async (req, res) => {
  const contactos = await Contacto.find();
  res.json(contactos);
};
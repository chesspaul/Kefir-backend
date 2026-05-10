import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER
export const register = asyncHandler(async (req, res) => {
  const { nombre, email, password } = req.body;

  // Validar campos obligatorios
  if (!nombre || !email || !password) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios");
  }

  // Validar que email no exista
  const userExistente = await User.findOne({ email });
  if (userExistente) {
    res.status(400);
    throw new Error("El email ya está registrado");
  }

  // Crear usuario
  const usuario = await User.create({
    nombre,
    email,
    password
  });

  // Generar token
  const token = generateToken(usuario._id);

  res.status(201).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    isAdmin: usuario.isAdmin,
    token
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validar que se envíen email y password
  if (!email || !password) {
    res.status(400);
    throw new Error("Email y contraseña son obligatorios");
  }

  // Buscar usuario por email
  const usuario = await User.findOne({ email });
  if (!usuario) {
    res.status(401);
    throw new Error("Email o contraseña incorrectos");
  }

  // Verificar password
  const esValido = await usuario.matchPassword(password);
  if (!esValido) {
    res.status(401);
    throw new Error("Email o contraseña incorrectos");
  }

  // Generar token
  const token = generateToken(usuario._id);

  res.status(200).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    isAdmin: usuario.isAdmin,
    token
  });
});

// GET PROFILE
export const getProfile = asyncHandler(async (req, res) => {
  const usuario = await User.findById(req.user.id);

  if (!usuario) {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }

  res.status(200).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    isAdmin: usuario.isAdmin
  });
});

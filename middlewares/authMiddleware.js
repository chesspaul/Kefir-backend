import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Middleware para proteger rutas (verificar JWT)
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Obtener token del header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Validar que existe token
  if (!token) {
    res.status(401);
    throw new Error("No autorizado, token no proporcionado");
  }

  try {
    // Verificar token
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodificado.id);

    if (!req.user) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("No autorizado, token inválido");
  }
});

// Middleware para verificar si es admin
export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("No autorizado, solo admins");
  }
});

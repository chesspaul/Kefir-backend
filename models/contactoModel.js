import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true },
  leido: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model("Contacto", contactoSchema);
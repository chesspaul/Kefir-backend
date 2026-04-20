import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  material: String,
  volumen: String,
  stock: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model("Producto", productoSchema);
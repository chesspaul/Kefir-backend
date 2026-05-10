import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Encriptar password antes de guardar
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Método para comparar passwords
userSchema.methods.matchPassword = async function(passwordIngresada) {
  return await bcryptjs.compare(passwordIngresada, this.password);
};

export default mongoose.model("User", userSchema);

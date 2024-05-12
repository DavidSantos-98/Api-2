import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  isActive?: boolean
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "default.png" },
  role: { type: String, default: "USER" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model<IUser>("User", UserSchema);
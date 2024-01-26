import mongoose, { Schema } from "mongoose";
import { User } from "./user.interface";

export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    passwordChangedAt: { type: Date },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;

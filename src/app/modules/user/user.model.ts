import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    passwordChangedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;

import mongoose, { Schema } from "mongoose";
import { IUser, UserInfo } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    role: {
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
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    passwordChangedAt: { type: Date },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
    customar: {
      type: Schema.Types.ObjectId,
      ref: "Customar",
    },
    donar: {
      type: Schema.Types.ObjectId,
      ref: "Donar",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const UserInfoSchema = new Schema<UserInfo>({
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;

import { Schema, model } from "mongoose";
import { IUser, UserInfo } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    passwordChangedAt: { type: Date },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "SellerModle",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "CustomerModle",
    },
    donar: {
      type: Schema.Types.ObjectId,
      ref: "DonarModle",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "AdminModle",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const UserInfoSchema = new Schema<UserInfo>({
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

const UserModel = model<IUser>("User", userSchema);

export default UserModel;

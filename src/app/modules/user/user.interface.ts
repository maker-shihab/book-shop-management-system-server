import { Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  role: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  phone: string;
  dateOfBirth?: Date;
  profileImage?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  _id: Types.ObjectId;
  role?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  phone: string;
  dateOfBirth?: Date;
  profileImage?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

import { Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { ICustomer } from "../customer/customar.interface";
import { IDonar } from "../donar/donar.interface";
import { ISeller } from "../seller/seller.interface";

export interface IUser extends Document {
  _id: Types.ObjectId;
  role?: string;
  userName: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  seller?: Types.ObjectId | ISeller;
  customar?: Types.ObjectId | ICustomer;
  donar?: Types.ObjectId | IDonar;
  admin?: Types.ObjectId | IAdmin;
}

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type UserInfo = {
  phone: string;
  dateOfBirth?: Date;
  profileImage?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
};

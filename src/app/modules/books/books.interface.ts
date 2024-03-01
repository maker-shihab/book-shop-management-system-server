import mongoose, { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IBook {
  _id: Types.ObjectId;
  title: string;
  author: mongoose.Types.ObjectId | IUser;
  description: string;
  category: string;
  price?: number;
  inStock: number;
  bookCover: string;
  isDonated: boolean;
  bookCondition: BookCondition;
  publicCationDate: Date;
}

export enum BookCondition {
  New = "New",
  SecondHand = "SecondHand",
}

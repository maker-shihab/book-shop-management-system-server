import { Types } from "mongoose";
import { ISeller } from "../seller/seller.interface";

export interface IBook extends Document {
  _id: Types.ObjectId;
  title: string;
  author?: Types.ObjectId | ISeller;
  writter: string;
  description: string;
  category: string;
  price?: number;
  inStock: number;
  bookCover: string;
  isFeatured?: boolean;
  isDonated?: boolean;
  bookStatus?: BookStatus;
  bookCondition: BookCondition;
  publicCationDate: Date;
}

export enum BookCondition {
  New = "New",
  SecondHand = "SecondHand",
}

export enum BookStatus {
  Active = "Active",
  Pending = "Pending",
  Rejected = "Rejected",
}

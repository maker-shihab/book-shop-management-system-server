import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IBook extends Document {
  _id: Types.ObjectId;
  title: string;
  author?: Types.ObjectId | IUser;
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

export type GetBooksOptions = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const bookSearchableFields = [
  "title",
  "writter",
  "category",
  "description",
];

export const bookFilterableFields = [
  "searchTerm",
  "id",
  "bloodGroup",
  "email",
  "contactNo",
  "emergencyContactNo",
];

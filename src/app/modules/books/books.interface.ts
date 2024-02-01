import { Types } from "mongoose";

export interface IBook {
  _id: Types.ObjectId;
  title: string;
  // author: mongoose.Types.ObjectId | IUser;
  description: string;
  category: string;
  price?: number;
  inStock: number;
  isDonated: boolean;
  bookCondition: BookCondition;
}

export enum BookCondition {
  New = "new",
  SecondHand = "second-hand",
}

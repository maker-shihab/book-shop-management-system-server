import mongoose from "mongoose";

export interface ICartItem {
  book: mongoose.Types.ObjectId;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

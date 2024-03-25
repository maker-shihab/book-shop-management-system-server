import mongoose, { Schema } from "mongoose";
import { ICart } from "./transactions.interface";

const cartSchema: Schema<ICart> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    { book: { type: Schema.Types.ObjectId, ref: "Book", required: true } },
  ],
});

const CartModel = mongoose.model<ICart>("Cart", cartSchema);

export default CartModel;

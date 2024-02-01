import mongoose, { Schema } from "mongoose";
import { BookCondition, IBook } from "./books.interface";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  // author: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  inStock: {
    type: Number,
    required: true,
  },
  isDonated: {
    type: Boolean,
    required: true,
  },
  bookCondition: {
    type: String,
    enum: Object.values(BookCondition),
    default: BookCondition.New,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;

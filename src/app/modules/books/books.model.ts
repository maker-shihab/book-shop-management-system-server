import mongoose, { Schema } from "mongoose";
import { BookCondition, BookStatus, IBook } from "./books.interface";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  writter: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  bookCover: {
    type: String,
    required: true,
  },
  isDonated: {
    type: Boolean,
  },
  isFeatured: {
    type: Boolean,
  },
  bookStatus: {
    type: String,
    enum: Object.values(BookStatus),
    default: BookStatus.Active,
  },
  bookCondition: {
    type: String,
    enum: Object.values(BookCondition),
    default: BookCondition.New,
  },
  publicCationDate: {
    type: Date,
    required: true,
  },
});

const BookModel = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;

import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./books.interface";
import BookModel from "./books.model";

const createBook = async (book: IBook): Promise<IBook> => {
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book detaild not set");
  }
  const result = await BookModel.create(book);
  // const bookWithAuthor = await BookModel.findById(bookId).populate('author');
  return result;
};

const getAllBooks = async (): Promise<IBook[] | null> => {
  const books = await BookModel.find();
  return books;
};

export const bookServices = {
  createBook,
  getAllBooks,
};

import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";
import UserModel from "../user/user.model";
import { IBook } from "./books.interface";
import BookModel from "./books.model";

const createBook = async (book: IBook): Promise<IBook> => {
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book detaild not set");
  }

  const authorId = book.author as mongoose.Types.ObjectId;
  const author = await UserModel.findById(authorId);

  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not exist!");
  }

  const result = await BookModel.create(book);
  return result;
};

const updateBook = async (book: IBook): Promise<IBook> => {
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book detaild not set");
  }
  const result = await BookModel.create(book);
  return result;
};

const getAllBooks = async (): Promise<IBook[] | null> => {
  const books = await BookModel.find();
  return books;
};

const buyBook = async (customerId: string, bookInfo: IBook) => {
  if(!customerId && bookInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something wrong, please try again");
  }
  
}

export const bookServices = {
  createBook,
  updateBook,
  getAllBooks,
  buyBook
};

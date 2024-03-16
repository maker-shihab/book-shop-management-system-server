import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { BookStatus, IBook } from "./books.interface";
import BookModel from "./books.model";

const createBook = async (book: IBook): Promise<IBook> => {
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book detaild not set");
  }

  book.bookStatus = BookStatus.Pending;
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
  if (!customerId || bookInfo) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Missing required fields: Customer Id and User Information"
    );
  }
};
const updateBookStatus = async (bookId: string, status: BookStatus) => {
  if (!bookId || status) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Missing required fields: bookId and status"
    );
  }
  const findBook = BookModel.findById(bookId);
  if (!findBook) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book not found for update status"
    );
  }
  const updatedBook = await BookModel.findByIdAndUpdate(
    bookId,
    { status },
    { new: true }
  );

  return updatedBook;
};

export const bookServices = {
  createBook,
  updateBook,
  getAllBooks,
  buyBook,
  updateBookStatus,
};

// Find book by author
// const book = await BookModel.findById(bookId).populate('author');

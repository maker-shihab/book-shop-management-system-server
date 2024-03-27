import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interface/common";
import {
  BookCondition,
  BookStatus,
  GetBooksOptions,
  IBook,
  IPaginationOptions,
  bookSearchableFields,
} from "./books.interface";
import BookModel from "./books.model";

const createBook = async (book: IBook): Promise<IBook> => {
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book detaild not set");
  }
  // book.bookStatus = BookStatus.Pending;
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

const getAllBooks = async (
  filters: GetBooksOptions,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await BookModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BookModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getFeaturedBoooks = async (): Promise<IBook[] | null> => {
  const featuredBooks = await BookModel.find({ isFeatured: true });
  return featuredBooks;
};

const getDonationBooks = async (): Promise<IBook[] | null> => {
  const donation = { isDonated: true };
  const result = await BookModel.find(donation);
  return result;
};

const getBooksByContition = async (
  condition: BookCondition
): Promise<IBook[] | null> => {
  if (!condition) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This call missing something!");
  }
  const featuredBooks = await BookModel.find({ bookCondition: condition });

  return featuredBooks;
};

const getAllBooksByUser = async (userId: string) => {
  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Missing required fields: bookId"
    );
  }
  const findBook = await BookModel.find({ author: userId });
  if (!findBook) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book not found for update status"
    );
  }
  return findBook;
};

const getSingleBook = async (bookId: string) => {
  if (!bookId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Missing required fields: bookId"
    );
  }

  const findBook = await BookModel.findById(bookId);

  if (!findBook) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book not found for update status"
    );
  }

  return findBook;
};

const updateBookStatus = async (bookId: string, status: BookStatus) => {
  if (!bookId || status) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Missing required fields: bookId and status"
    );
  }
  const findBook = await BookModel.findById(bookId);
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

const deleteBook = async (bookId: string) => {
  if (!bookId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }
  try {
    await BookModel.findByIdAndDelete(bookId);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`);
  }
};

const bookUpdate = async (bookId: string, bookData: IBook) => {
  if (!bookId && !bookData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book data mismatch!");
  }
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, bookData, {
      new: true,
    });
    return updatedBook;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Book update unsuccessfully ${error}`
    );
  }
};

export const bookServices = {
  createBook,
  updateBook,
  getAllBooks,
  updateBookStatus,
  getDonationBooks,
  getBooksByContition,
  getFeaturedBoooks,
  getSingleBook,
  getAllBooksByUser,
  deleteBook,
  bookUpdate,
};

import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginationFields } from "./books.constant";
import { BookCondition, IBook, bookFilterableFields } from "./books.interface";
import { bookServices } from "./books.services";

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const book = req.body;
    const result = await bookServices.createBook(book);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Book Create successfully",
    });
  }
);

const updateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const book = req.body;
    const result = await bookServices.updateBook(book);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Book Create successfully",
    });
  }
);

const getBooksByContition: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const condition: BookCondition = req.params.condition as BookCondition;

    const featuredBooks: IBook[] | null =
      await bookServices.getBooksByContition(condition);

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: featuredBooks,
      message: "Book retrip successfull",
    });
  }
);

const getDonationBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const books = await bookServices.getDonationBooks();

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: books,
      message: "Book retrip successfull",
    });
  }
);

const getFeaturedBoooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const books = await bookServices.getFeaturedBoooks();

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: books,
      message: "Books fetched successfully",
    });
  }
);

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await bookServices.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateBookStatus = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { status } = req.body;
  const result = await bookServices.updateBookStatus(bookId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Book status update successfull",
  });
});

const deleteBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    await bookServices.deleteBook(bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book deleted successfully!",
    });
  }
);

const bookUpdate = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;
  const result = await bookServices.bookUpdate(bookId, updatedBookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Book updated successfully",
  });
});

export const bookController = {
  createBook,
  updateBook,
  getAllBooks,
  updateBookStatus,
  getBooksByContition,
  getDonationBooks,
  getFeaturedBoooks,
  deleteBook,
  bookUpdate,
};

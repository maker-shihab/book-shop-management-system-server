import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./books.interface";
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

const getAllBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const books = await bookServices.getAllBooks();

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: books,
      message: "Book retrip successfull",
    });
  }
);

export const bookController = {
  createBook,
  getAllBooks,
};

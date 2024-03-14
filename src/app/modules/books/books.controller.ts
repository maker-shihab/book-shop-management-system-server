import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBook } from "./books.interface";
import { bookServices } from "./books.services";
import ApiError from "../../../errors/ApiError";

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

const buyBook = catchAsync(async(req: Request, res: Response) => {
  const data = req.body;
  const {customarId, bookInfo} = data;
 
  const result = await bookServices.buyBook(customarId, bookInfo);

})

export const bookController = {
  createBook,
  updateBook,
  getAllBooks,
  buyBook
};

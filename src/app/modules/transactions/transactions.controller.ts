import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { transactionsServices } from "./transactions.services";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const books = req.body;

  if (!token) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }

  const result = await transactionsServices.addToCart(token, books);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Order place successfully",
  });
});

export const transactionsController = {
  addToCart,
};

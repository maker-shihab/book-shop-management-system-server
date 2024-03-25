import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import User from "../user/user.model";
import { ICart } from "./transactions.interface";
import CartModel from "./transactions.model";

const addToCart = async (token: string, bookIds: string[]): Promise<ICart> => {
  if (!bookIds || bookIds.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Books not found");
  }

  let verifiedToken: any;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "User unauthorize");
  }

  const { userId } = verifiedToken;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  let cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    cart = new CartModel({ user: userId, items: [] });
  }
  console.log(cart);
  for (const bookId of bookIds) {
    const bookObjectId = new mongoose.Types.ObjectId(bookId);
    cart.items.push({ book: bookObjectId });
  }

  await cart.save();

  return cart;
};

export const transactionsServices = {
  addToCart,
};

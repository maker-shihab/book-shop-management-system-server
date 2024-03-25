import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

import { hashPassword } from "../../../helpers/helper";
import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (userData: IUser): Promise<IUser | null> => {
  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User data mismatch!");
  }
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;

  const newUser = await User.create(userData);
  return newUser;
};

const createAdminService = async (user: IUser): Promise<IUser | null> => {
  return user;
};

const getUserProfileData = async (token: string): Promise<IUser | null> => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not exist");
  }

  let verifiedToken: any;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Token is not valide");
  }

  const { userId } = verifiedToken;

  // Check if the user exists
  const userData = await User.findById(userId);

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return userData;
};

export const UserServices = {
  createUser,
  createAdminService,
  getUserProfileData,
};

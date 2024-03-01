import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import UserModel from "./user.model";

const createUserService = async (user: IUser): Promise<IUser | null> => {
  // Password Hashing
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  user.password = hashedPassword;

  // For unique Field check
  const uniqueFieldsQuery = {
    $or: [
      { userName: user.userName },
      { email: user.email },
      { phone: user.phone },
    ],
  };

  const existingUser = await UserModel.findOne(uniqueFieldsQuery);

  if (existingUser) {
    const conflictingField =
      existingUser.userName === user.userName
        ? "User Name"
        : existingUser.email === user.email
        ? "Email"
        : "Phone Number";

    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${conflictingField} already exists`
    );
  }

  const newUser = await UserModel.create(user);
  return newUser;
};

const getUserByIdService = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user by ID");
  }
};
export const UserServices = {
  createUserService,
  getUserByIdService,
};

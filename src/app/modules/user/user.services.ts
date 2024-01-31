import { IUser } from "./user.interface";
import UserModel from "./user.model";

const createUserService = async (user: IUser): Promise<IUser | null> => {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
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

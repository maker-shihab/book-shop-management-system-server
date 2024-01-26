import { User } from "./user.interface";
import UserModel, { UserDocument } from "./user.model";

export const createUserService = async (user: User): Promise<UserDocument> => {
  try {
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const getUserByIdService = async (
  userId: string
): Promise<UserDocument | null> => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user by ID");
  }
};

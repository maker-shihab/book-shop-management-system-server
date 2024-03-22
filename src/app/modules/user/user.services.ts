import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { hashPassword } from "../../../helpers/helper";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { IAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.model";
import { ICustomer } from "../customer/customar.interface";
import Customar from "../customer/customar.model";
import { IDonar } from "../donar/donar.interface";
import Donar from "../donar/donar.model";
import { ISeller } from "../seller/seller.interface";
import Seller from "../seller/seller.model";
import { IUser } from "./user.interface";
import User from "./user.model";

const createSellerService = async (
  seller: ISeller,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await User.startSession();
  session.startTransaction();

  try {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    user.role = "seller";

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create seller");
    }

    user.seller = newSeller[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create seller");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      _id: newUserAllData._id,
    }).populate({
      path: "seller",
    });
  }

  return newUserAllData;
};

const createCustomarService = async (
  customar: ICustomer,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await User.startSession();
  session.startTransaction();

  try {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    user.role = "customar";

    const newCustomar = await Customar.create([customar], { session });

    if (!newCustomar.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    user.customar = newCustomar[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      _id: newUserAllData._id,
    }).populate({
      path: "customar",
    });
  }

  return newUserAllData;
};

const createDonarService = async (
  donar: IDonar,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await User.startSession();
  session.startTransaction();

  try {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    user.role = "donar";

    const newDonar = await Donar.create([donar], { session });

    if (!newDonar.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    user.donar = newDonar[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      _id: newUserAllData._id,
    }).populate({
      path: "donar",
    });
  }

  return newUserAllData;
};

const createAdminService = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await User.startSession();
  session.startTransaction();

  try {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    user.role = "admin";

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      _id: newUserAllData._id,
    }).populate({
      path: "admin",
    });
  }

  return newUserAllData;
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
  const userData = await User.findById(userId).lean();

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (userData.role) {
    const userProfileInfo = await User.findOne({ _id: userData._id })
      .populate(userData.role)
      .lean();

    return userProfileInfo;
  }

  return userData;
};

export const UserServices = {
  createSellerService,
  createCustomarService,
  createDonarService,
  createAdminService,
  getUserProfileData,
};

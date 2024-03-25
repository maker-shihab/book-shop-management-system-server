import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import sendResponse from "../../../shared/sendResponse";
import User from "./user.model";
import { UserServices } from "./user.services";

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserServices.createUser(userData);

  if (result === null) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Information mismatch");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successfull",
    data: result,
  });
};

export const createAdmin = async (req: Request, res: Response) => {
  const { newUser } = req.body;

  const result = await UserServices.createAdminService(newUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successfull",
    data: result,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfileData = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not exist");
  }
  const result = await UserServices.getUserProfileData(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User rettrive Successfull",
    data: result,
  });
};

export const UserController = {
  createUser,
  createAdmin,
  getUserProfileData,
};

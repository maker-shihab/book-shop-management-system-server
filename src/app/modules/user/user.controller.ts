import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import sendResponse from "../../../shared/sendResponse";
import User from "./user.model";
import { UserServices } from "./user.services";

export const createSeller = async (req: Request, res: Response) => {
  const { seller, ...userData } = req.body;

  const result = await UserServices.createSellerService(seller, userData);

  // const {password, ...usesrAllInfo} = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successfull",
    data: result,
  });
};

export const createCustomar = async (req: Request, res: Response) => {
  const { customar, ...newUser } = req.body;

  const result = await UserServices.createCustomarService(customar, newUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successfull",
    data: result,
  });
};

export const createDonar = async (req: Request, res: Response) => {
  const { donar, ...newUser } = req.body;

  const result = await UserServices.createDonarService(donar, newUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successfull",
    data: result,
  });
};

export const createAdmin = async (req: Request, res: Response) => {
  const { admin, ...newUser } = req.body;

  const result = await UserServices.createAdminService(admin, newUser);

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

  const { ...userData } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User rettrive Successfull",
    data: userData,
  });
};

export const UserController = {
  createSeller,
  createAdmin,
  createCustomar,
  createDonar,
  getUserProfileData,
};

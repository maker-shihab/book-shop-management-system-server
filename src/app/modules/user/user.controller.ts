import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import UserModel from "./user.model";
import { UserServices } from "./user.services";

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;

  const result = await UserServices.createUserService(newUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successfull",
    data: result,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
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

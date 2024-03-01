import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { authServices } from "./auth.services";

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authServices.login(loginData);

  if (!result) {
    throw new Error("Login failed. No user found.");
  }

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    httpOnly: true,
    secure: config.env === "development",
    // sameSite: 'None',
    path: "/",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  const result = await authServices.refreshToken(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token successfully extended!",
    data: result,
  });
});

export const authController = {
  login,
  refreshToken,
};

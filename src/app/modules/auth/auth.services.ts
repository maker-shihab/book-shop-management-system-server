import * as bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { default as User } from "../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";

const login = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { identifier, password } = payload;
  if (!identifier) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found login information");
  }

  const user = await User.findOne({
    $or: [{ userName: identifier }, { email: identifier }],
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Compare Password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.NOT_FOUND, "User info or password wrong!");
  }
  const { _id: userId, role: role } = user;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken: any;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Refresh Token - expire");
  }

  const { userId } = verifiedToken;

  // Check if the user exists
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Generate a new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: (isUserExist as any)._id,
      role: (isUserExist as any).role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authServices = {
  login,
  refreshToken,
};

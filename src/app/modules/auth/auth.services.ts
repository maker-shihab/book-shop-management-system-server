import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const login = async (data: string) => {
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found login information");
  }
};

export const authServices = {
  login,
};

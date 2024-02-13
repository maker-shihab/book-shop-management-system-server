import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const login = async (identifyer: string) => {
  if (!identifyer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found login information");
  }
  const { password, userName, email } = identifyer;
};

export const authServices = {
  login,
};

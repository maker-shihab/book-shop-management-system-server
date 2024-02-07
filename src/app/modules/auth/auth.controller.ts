import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.services";

const login = catchAsync(async (req, res) => {
  const { data } = req.body;
  const result = authServices.login(data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successfull",
    data: result,
  });
  return result;
});

export const authController = {
  login,
};

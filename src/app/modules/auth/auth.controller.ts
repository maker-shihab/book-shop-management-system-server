import catchAsync from "../../../shared/catchAsync";
import { authServices } from "./auth.services";

const login = catchAsync(async (req, res) => {
  const { data } = req.body;
  const result = authServices.login(data);
  return data;
});

export const authController = {
  login,
};

import catchAsync from "../../../shared/catchAsync";

const login = catchAsync(async (req, res) => {
  const { data } = req.body;
  const result = authServices.login(data);
  return data;
});

export const authController = {
  login,
};

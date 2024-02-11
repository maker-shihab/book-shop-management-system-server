import catchAsync from "../../../shared/catchAsync";

const login = catchAsync(async (req, res) => {
  const { data } = req.body;
  return data;
});

export const authController = {
  login,
};

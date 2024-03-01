import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashPassword } from "../../../helpers/helper";
import { ISeller } from "../seller/seller.interface";
import Seller from "../seller/seller.model";
import { IUser } from "./user.interface";
import User from "./user.model";

const createSellerService = async (
  seller: ISeller,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  const session = await User.startSession();
  session.startTransaction();

  try {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    user.role = "seller";

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    user.seller = newSeller[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      _id: newUserAllData._id,
    }).populate({
      path: "seller",
    });
  }

  return newUserAllData;
};

// const createUserService = async (user: IUser): Promise<IUser | null> => {
//   // Password Hashing
//   const hashedPassword = await bcrypt.hash(
//     user.password,
//     Number(config.bycrypt_salt_rounds)
//   );

//   user.password = hashedPassword;

//   // For unique Field check
//   const uniqueFieldsQuery = {
//     $or: [
//       { userName: user.userName },
//       { email: user.email },
//       { phone: user.phone },
//     ],
//   };

//   const existingUser = await UserModel.findOne(uniqueFieldsQuery);

//   if (existingUser) {
//     const conflictingField =
//       existingUser.userName === user.userName
//         ? "User Name"
//         : existingUser.email === user.email
//         ? "Email"
//         : "Phone Number";

//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       `${conflictingField} already exists`
//     );
//   }

//   const newUser = await UserModel.create(user);
//   return newUser;
// };

const getUserByIdService = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user by ID");
  }
};

export const UserServices = {
  createSellerService,
  getUserByIdService,
};

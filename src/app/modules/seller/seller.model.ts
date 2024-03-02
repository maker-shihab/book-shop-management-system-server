import mongoose, { Schema } from "mongoose";
import { UserInfoSchema } from "../user/user.model";
import { ISeller } from "./seller.interface";

const sellerSchema = new Schema<ISeller>({
  name: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: {
      type: String,
    },
  },
  credit: {
    type: String,
  },
  information: {
    type: UserInfoSchema,
  },
});

const Seller = mongoose.model<ISeller>("Seller", sellerSchema);

export default Seller;

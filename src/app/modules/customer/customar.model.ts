import mongoose, { Schema } from "mongoose";
import { UserInfoSchema } from "../user/user.model";
import { ICustomer } from "./customar.interface";

const customarSchema = new Schema<ICustomer>({
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
  balance: {
    type: Number,
  },
  information: {
    type: UserInfoSchema,
  },
});

const Customar = mongoose.model<ICustomer>("Customar", customarSchema);

export default Customar;

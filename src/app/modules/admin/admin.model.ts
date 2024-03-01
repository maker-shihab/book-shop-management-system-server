import mongoose, { Schema } from "mongoose";
import { UserInfoSchema } from "../user/user.model";
import { IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>({
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
  information: {
    type: UserInfoSchema,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

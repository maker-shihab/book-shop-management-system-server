import { Schema } from "mongoose";
import { IAdmin } from "./admin.interface";

const AdminModel = new Schema<IAdmin>({
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
});

import mongoose, { Schema } from "mongoose";
import { UserInfoSchema } from "../user/user.model";
import { IDonar } from "./donar.interface";

const donarSchema = new Schema<IDonar>({
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

const Donar = mongoose.model("Donar", donarSchema);

export default Donar;

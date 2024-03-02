import { Types } from "mongoose";
import { UserInfo, UserName } from "../user/user.interface";

export interface ICustomer extends Document {
  _id: Types.ObjectId;
  name: UserName;
  balance?: number;
  information: UserInfo;
}

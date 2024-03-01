import { Types } from "mongoose";
import { UserInfo, UserName } from "../user/user.interface";

export interface ICustomer extends Document {
  _id: Types.ObjectId;
  credit: number;
  name: UserName;
  information: UserInfo;
}

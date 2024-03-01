import { Types } from "mongoose";
import { UserInfo } from "../user/user.interface";

export interface ISeller extends Document {
  _id: Types.ObjectId;
  credit: number;
  information: UserInfo;
}

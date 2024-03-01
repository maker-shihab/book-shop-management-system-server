import { Types } from "mongoose";
import { UserInfo } from "../user/user.interface";

export interface IDonar extends Document {
  _id: Types.ObjectId;
  credit?: number;
  information: UserInfo;
}

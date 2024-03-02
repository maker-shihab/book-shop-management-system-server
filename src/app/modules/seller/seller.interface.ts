import { Types } from "mongoose";
import { UserInfo, UserName } from "../user/user.interface";

export interface ISeller extends Document {
  _id: Types.ObjectId;
  name: UserName;
  credit?: string;
  information?: UserInfo;
}

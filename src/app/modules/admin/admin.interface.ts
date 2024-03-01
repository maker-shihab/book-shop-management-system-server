import { Types } from "mongoose";
import { UserInfo, UserName } from "../user/user.interface";

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  name: UserName;
  information: UserInfo;
}

export interface IUser extends Document {
  id: string;
  role: string;
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  profileImage?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

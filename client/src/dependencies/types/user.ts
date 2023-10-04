export interface User {
  _id?: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  profpic?: string;
  role?: string;
  password: string;
  newPassword?: string;
  passwordVerification?: string;
  accessToken?: string;
  allChat?: boolean;
  autoAssign?: boolean;
  domain?: string;
}

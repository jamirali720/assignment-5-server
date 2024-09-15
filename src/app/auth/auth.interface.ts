import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";
import { roles } from "../user/user.constraint";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  image: {
    url: string;
    public_id: string;
  }
}




export interface ILoginData {
  email: string;
  password: string;
}

export type TRoles = keyof typeof roles;

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload; // imported from jsonwebtoken;
    }
  }
}

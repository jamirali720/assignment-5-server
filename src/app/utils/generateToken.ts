import jwt from "jsonwebtoken";
import { IUser } from "../auth/auth.interface";

const createAccessToken = (
  payload: Partial<IUser>,
  secretKey: string,
  expiresIn: string
) => {
  const tokenObject = {
    userId: payload._id,
    email: payload.email,
    role: payload.role,
  };
   return jwt.sign(tokenObject, secretKey, { expiresIn });
};

const createRefreshToken = (
  payload: Partial<IUser>,
  secretKey: string,
  expiresIn: string
) => {
  const tokenObject = {
    userId: payload._id,
    email: payload.email,
    role: payload.role,
  };
  return jwt.sign(tokenObject, secretKey, { expiresIn });
};

export const generateToken = {
  createAccessToken,
  createRefreshToken,
}

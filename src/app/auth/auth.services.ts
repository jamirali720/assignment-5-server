import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/error";
import { User } from "../user/user.model";
import { IUser } from "./auth.interface";
import configs from "../configs";
import { generateToken } from "../utils/generateToken";
import { ILoginData } from "./auth.interface";
import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";
import verifyToken from "./auth.utils";

const signupUserService = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new ErrorHandler(httpStatus.CONFLICT, "User Already exist");
  }

  let result = await User.create(payload);

  return result;
};

const loginUserService = async (payload: ILoginData) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      "User dose not exist with email"
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Password not matched");
  }

  const accessToken = generateToken.createAccessToken(
    user,
    configs.jwtAccessTokenSecretKey as string,
    configs.jwtAccessTokenExpiration as string
  );

  const refreshToken = generateToken.createAccessToken(
    user,
    configs.jwtRefreshTokenSecretKey as string,
    configs.jwtRefreshTokenExpiration as string
  );

  

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const getRefreshTokenService = async (token: string) => {
  console.log("check service", token);
  const decoded = verifyToken(
    token,
    configs.jwtRefreshTokenSecretKey as string
  ) as JwtPayload;


  if (!decoded) {
    throw new ErrorHandler(
      httpStatus.UNAUTHORIZED,
      "Refresh token is invalid or expired"
    );
  }

  const { userId } = decoded;
  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User not found");
  }

  const accessToken = generateToken.createAccessToken(
    user,
    configs.jwtAccessTokenSecretKey as string,
    configs.jwtAccessTokenExpiration as string
  );
  
  return {
    user,
    accessToken, 
  }
    
};

export const authServices = {
  signupUserService,
  loginUserService,
  getRefreshTokenService,
};

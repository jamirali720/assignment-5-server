import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/higherOrderFunction";
import { ErrorHandler } from "../utils/error";

import { TRoles } from "../auth/auth.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import verifyToken from "../auth/auth.utils";
import configs from "../configs";


export const isAuthenticated = (...roles: TRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers?.authorization?.split("Bearer ")[1] ||
      req.rawHeaders[1].split("Bearer ")[1];

    if (!token) {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        "You are un-authenticated. Please Login first"
      );
    }

    const decoded = verifyToken(token, configs.jwtAccessTokenSecretKey as string);   

    if (!decoded) {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        "You are not authorized or your token has been expired. Please Login first "
      );
    }

    const { userId, role } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, "User not found");
    }

    if (roles && !roles.includes(role)) {
      throw new ErrorHandler(
        httpStatus.FORBIDDEN,
        "You have no access to this route"
      );
    }

    req.user = decoded;
    next();
  });
};

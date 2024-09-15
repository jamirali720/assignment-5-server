import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";



const verifyToken = (token: string, secretKey:string) => {
  
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new ErrorHandler(
      httpStatus.UNAUTHORIZED,
      (error as Error).message ||
        "Invalid token or expired, please login and try again"
      //
    );
  }
};
export default verifyToken;

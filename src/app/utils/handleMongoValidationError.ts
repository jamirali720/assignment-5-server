import mongoose from "mongoose";
import { TErrorResponse, TErrorSource } from "./error";

const handleMongooseErrors = (
  err: mongoose.Error.ValidationError
): TErrorResponse => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (value: mongoose.Error.CastError | mongoose.Error.ValidatorError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: "Mongoose validation failed",
    errorSource,
  };
};

export default handleMongooseErrors;

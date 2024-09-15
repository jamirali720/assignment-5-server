import mongoose from "mongoose";
import { TErrorSource } from "./error";

const handleCastErrors = (err: mongoose.Error.CastError) => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSource,
  };
};

export default handleCastErrors;

import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { handleZodErrors } from "./handleZodErrors";
import handleMongooseErrors from "./handleMongoValidationError";
import handleCastErrors from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import configs from "../configs";

export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSource?: TErrorSource;
};

// error hanlder class
export class ErrorHandler extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// global error handler middleware
export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  let message: string = err.message || "Internal Server Error";
  let statusCode: number = err.statusCode || 500;

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const errors = handleZodErrors(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err.name === "ValidationError") {
    const errors = handleMongooseErrors(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err.name === "CastError") {
    const errors = handleCastErrors(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err.code === 11000) {
    const errors = handleDuplicateError(err);
    statusCode = errors.statusCode;
    message = errors.message;
    errorSource = errors.errorSource as TErrorSource;
  } else if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err.name === "jsonWebTokenError") {
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err?.message || "json web token invalid. Please login again!",
      },
    ];
  } else if (err.name === "TokenExpiredError") {
    message = err?.message;
    errorSource = [
      {
        path: "",
        message:
          err?.message ||
          "json web token expired. Please login and try again !",
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSource,
    stack: configs.NODE_ENV === "development" ? err.stack : null,
  });
};

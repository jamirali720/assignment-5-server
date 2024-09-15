import { ZodError, ZodIssue } from "zod";
import { TErrorResponse, TErrorSource } from "./error";

export const handleZodErrors = (err: ZodError): TErrorResponse => {
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: "Zod Validation failed",
    errorSource,
  };
};

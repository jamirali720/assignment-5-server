import { AnyZodObject } from "zod";
import catchAsync from "../utils/higherOrderFunction";
import { NextFunction, Request, Response } from "express";

export const runValidator = (Schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await Schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

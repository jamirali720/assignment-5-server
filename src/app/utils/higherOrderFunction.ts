import { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express-serve-static-core";

const catchAsync = (theFunc: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;

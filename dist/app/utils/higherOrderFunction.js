"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (theFunc) => {
    return (req, res, next) => {
        Promise.resolve(theFunc(req, res, next)).catch((error) => next(error));
    };
};
exports.default = catchAsync;

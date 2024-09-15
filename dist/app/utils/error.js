"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodErrors_1 = require("./handleZodErrors");
const handleMongoValidationError_1 = __importDefault(require("./handleMongoValidationError"));
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const configs_1 = __importDefault(require("../configs"));
// error hanlder class
class ErrorHandler extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
// global error handler middleware
const handleError = (err, _req, res, _next) => {
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
    let errorSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const errors = (0, handleZodErrors_1.handleZodErrors)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err.name === "ValidationError") {
        const errors = (0, handleMongoValidationError_1.default)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err.name === "CastError") {
        const errors = (0, handleCastError_1.default)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err.code === 11000) {
        const errors = (0, handleDuplicateError_1.default)(err);
        statusCode = errors.statusCode;
        message = errors.message;
        errorSource = errors.errorSource;
    }
    else if (err instanceof ErrorHandler) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err.name === "jsonWebTokenError") {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: (err === null || err === void 0 ? void 0 : err.message) || "json web token invalid. Please login again!",
            },
        ];
    }
    else if (err.name === "TokenExpiredError") {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [
            {
                path: "",
                message: (err === null || err === void 0 ? void 0 : err.message) ||
                    "json web token expired. Please login and try again !",
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSource,
        stack: configs_1.default.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.handleError = handleError;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const verifyToken = (token, secretKey) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new error_1.ErrorHandler(http_status_1.default.UNAUTHORIZED, error.message ||
            "Invalid token or expired, please login and try again"
        //
        );
    }
};
exports.default = verifyToken;

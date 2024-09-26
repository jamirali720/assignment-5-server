"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (payload, secretKey, expiresIn) => {
    const tokenObject = {
        userId: payload._id,
        email: payload.email,
        role: payload.role,
    };
    return jsonwebtoken_1.default.sign(tokenObject, secretKey, { expiresIn });
};
const createRefreshToken = (payload, secretKey, expiresIn) => {
    const tokenObject = {
        userId: payload._id,
        email: payload.email,
        role: payload.role,
    };
    return jsonwebtoken_1.default.sign(tokenObject, secretKey, { expiresIn });
};
exports.generateToken = {
    createAccessToken,
    createRefreshToken,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGODB_DATABASE_PRODUCTION_URL,
    saltRound: process.env.BCRYPT_SALT_ROUND,
    jwtAccessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    jwtRefreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
    NODE_ENV: process.env.NODE_ENV,
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../utils/error");
const user_model_1 = require("../user/user.model");
const configs_1 = __importDefault(require("../configs"));
const generateToken_1 = require("../utils/generateToken");
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = __importDefault(require("./auth.utils"));
const signupUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new error_1.ErrorHandler(http_status_1.default.CONFLICT, "User Already exist");
    }
    let result = yield user_model_1.User.create(payload);
    return result;
});
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "User dose not exist with email");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new error_1.ErrorHandler(http_status_1.default.CONFLICT, "Password not matched");
    }
    const accessToken = generateToken_1.generateToken.createAccessToken(user, configs_1.default.jwtAccessTokenSecretKey, configs_1.default.jwtAccessTokenExpiration);
    const refreshToken = generateToken_1.generateToken.createAccessToken(user, configs_1.default.jwtRefreshTokenSecretKey, configs_1.default.jwtRefreshTokenExpiration);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const getRefreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("check service", token);
    const decoded = (0, auth_utils_1.default)(token, configs_1.default.jwtRefreshTokenSecretKey);
    if (!decoded) {
        throw new error_1.ErrorHandler(http_status_1.default.UNAUTHORIZED, "Refresh token is invalid or expired");
    }
    const { userId } = decoded;
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "User not found");
    }
    const accessToken = generateToken_1.generateToken.createAccessToken(user, configs_1.default.jwtAccessTokenSecretKey, configs_1.default.jwtAccessTokenExpiration);
    return {
        user,
        accessToken,
    };
});
exports.authServices = {
    signupUserService,
    loginUserService,
    getRefreshTokenService,
};

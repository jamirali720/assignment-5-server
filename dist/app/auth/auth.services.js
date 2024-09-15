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
const error_1 = require("../utils/error");
const user_model_1 = require("../user/user.model");
const configs_1 = __importDefault(require("../configs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const http_status_1 = __importDefault(require("http-status"));
const signupUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield user_model_1.User.create(payload);
    return result;
});
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.isUserExists(email);
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "User dose not exist");
    }
    const isPasswordMatched = yield user_model_1.User.comparePassword(password, user.password);
    if (!isPasswordMatched) {
        throw new error_1.ErrorHandler(http_status_1.default.CONFLICT, "Password not matched");
    }
    const token = (0, generateToken_1.default)(user, configs_1.default.jwtAccessTokenSecretKey, configs_1.default.jwtAccessTokenExpiration);
    return {
        user,
        token,
    };
});
exports.authServices = {
    signupUserService,
    loginUserService,
};

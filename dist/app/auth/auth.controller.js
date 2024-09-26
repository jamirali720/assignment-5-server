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
exports.authentication = exports.handleRefreshToken = exports.handleLoginUser = exports.handleSignUpUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const auth_services_1 = require("./auth.services");
const upload_1 = require("../multer/upload");
const configs_1 = __importDefault(require("../configs"));
exports.handleSignUpUser = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield auth_services_1.authServices.signupUserService(Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: result,
    });
}));
exports.handleLoginUser = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.loginUserService(req.body);
    const { user, accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days;
        httpOnly: true,
        secure: configs_1.default.NODE_ENV === "production",
        // sameSite: "none",
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: 201,
        message: "User logged in successfully",
        token: accessToken,
        data: user,
    });
}));
exports.handleRefreshToken = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    console.log("check controller", refreshToken);
    const result = yield auth_services_1.authServices.getRefreshTokenService(refreshToken);
    const { user, accessToken } = result;
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: 201,
        message: "New Access token retrieved successfully",
        token: accessToken,
    });
}));
exports.authentication = {
    handleSignUpUser: exports.handleSignUpUser,
    handleLoginUser: exports.handleLoginUser,
    handleRefreshToken: exports.handleRefreshToken,
};

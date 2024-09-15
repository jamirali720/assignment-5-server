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
exports.isAuthenticated = void 0;
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const configs_1 = __importDefault(require("../configs"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const isAuthenticated = (...roles) => {
    return (0, higherOrderFunction_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const token = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split("Bearer ")[1]) ||
            req.rawHeaders[1].split("Bearer ")[1];
        if (!token) {
            throw new error_1.ErrorHandler(http_status_1.default.UNAUTHORIZED, "You are un-authenticated. Please Login first");
        }
        const decoded = jsonwebtoken_1.default.verify(token, configs_1.default.jwtAccessTokenSecretKey);
        if (!decoded) {
            throw new error_1.ErrorHandler(http_status_1.default.UNAUTHORIZED, "You are not authorized or your token has been expired. Please Login first ");
        }
        const { userId, role } = decoded;
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "User not found");
        }
        if (roles && !roles.includes(role)) {
            throw new error_1.ErrorHandler(http_status_1.default.FORBIDDEN, "You have no access to this route");
        }
        req.user = decoded;
        next();
    }));
};
exports.isAuthenticated = isAuthenticated;

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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const user_model_1 = require("./user.model");
const getUsersProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return user;
});
const updateUsersProfileService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    const allowedUpdatesFields = ["name", "phone"];
    if (payload && typeof payload === "object") {
        for (const key in payload) {
            if (allowedUpdatesFields.includes(key)) {
                updates[key] = payload[key];
            }
        }
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update ");
    }
    return result;
});
exports.userService = {
    getUsersProfileService,
    updateUsersProfileService,
};

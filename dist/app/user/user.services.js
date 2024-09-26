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
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const user_model_1 = require("./user.model");
const configs_1 = __importDefault(require("../configs"));
const getUsersProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return user;
});
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    if (!users) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No users Found");
    }
    return users;
});
// update user profile
const updateUsersProfileService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    const allowedUpdatesFields = ["name", "phone", "email", "address"];
    if (payload && typeof payload === "object") {
        for (const key in payload) {
            if (allowedUpdatesFields.includes(key)) {
                updates[key] = payload[key];
            }
        }
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update ");
    }
    return result;
});
// Update users profile image
const updateUserProfileImage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, Object.assign({}, payload), { new: true, runValidators: true });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to update user profile image");
    }
    return result;
});
// change user password
const changePasswordService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "User dose not exist");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.currentPassword, user.password);
    if (!isPasswordMatched) {
        throw new error_1.ErrorHandler(http_status_1.default.CONFLICT, "Current password not matched");
    }
    if (payload.newPassword !== payload.confirmPassword) {
        throw new error_1.ErrorHandler(http_status_1.default.CONFLICT, "Passwords do not match");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(configs_1.default.saltRound));
    const result = yield user_model_1.User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true, runValidators: true });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to change password");
    }
    return result;
});
// update user status
const updateUserRoleService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update user status");
    }
    return user;
});
// delete user
const deleteUserFromDBService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    return yield user_model_1.User.findByIdAndDelete(id);
});
exports.userService = {
    getUsersProfileService,
    getAllUsersService,
    updateUsersProfileService,
    updateUserProfileImage,
    changePasswordService,
    updateUserRoleService,
    deleteUserFromDBService,
};

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
exports.userController = void 0;
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const user_services_1 = require("./user.services");
const handleGetUserProfile = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    const result = yield user_services_1.userService.getUsersProfileService(id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Your profile retrieved successfully",
        data: result
    });
}));
const handleUpdateUserProfile = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    const updateData = req.body;
    const result = yield user_services_1.userService.updateUsersProfileService(id, updateData);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Your profile updated successfully",
        data: result
    });
}));
exports.userController = {
    handleGetUserProfile,
    handleUpdateUserProfile
};

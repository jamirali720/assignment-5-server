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
const upload_1 = require("../multer/upload");
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const user_services_1 = require("./user.services");
const user_model_1 = require("./user.model");
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
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
const handleGetAllUsers = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.userService.getAllUsersService();
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "users  retrieved successfully",
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
// update user status  
const handleUpdateUserRole = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const role = req.body;
    const result = yield user_services_1.userService.updateUserRoleService(id, role);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User role updated successfully",
        data: result
    });
}));
// delete user from database;
const handleDeleteUserFromDB = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const result = yield user_services_1.userService.deleteUserFromDBService(id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data: result
    });
}));
// update user profile image 
const handleUpdateUserProfileImage = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "User not found with this ID");
    }
    yield (0, upload_1.deleteImageFromCloudinary)(user.image.public_id);
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield user_services_1.userService.updateUserProfileImage(id, {
        image: { url: resp.secure_url, public_id: resp.public_id },
    });
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Your profile image updated successfully",
        data: result,
    });
}));
const handleChangUserPassword = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.userId;
    const result = yield user_services_1.userService.changePasswordService(id, Object.assign({}, req.body));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Your password changed successfully",
        data: result,
    });
}));
exports.userController = {
    handleGetUserProfile,
    handleGetAllUsers,
    handleUpdateUserProfile,
    handleUpdateUserProfileImage,
    handleChangUserPassword,
    handleUpdateUserRole,
    handleDeleteUserFromDB,
};

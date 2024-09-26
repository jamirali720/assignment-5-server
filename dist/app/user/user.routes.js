"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const authentication_1 = require("../middleware/authentication");
const user_constraint_1 = require("./user.constraint");
const runValidator_1 = require("../middleware/runValidator");
const user_zod_validation_1 = require("./user.zod.validation");
const upload_1 = require("../multer/upload");
const userRouter = (0, express_1.Router)();
userRouter
    .route("/profile")
    .get((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin, user_constraint_1.roles.user), user_controllers_1.userController.handleGetUserProfile);
userRouter
    .route("/update-profile")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin, user_constraint_1.roles.user), (0, runValidator_1.runValidator)(user_zod_validation_1.userUpdateValidationSchema), user_controllers_1.userController.handleUpdateUserProfile);
userRouter
    .route("/update-profile-image")
    .put(upload_1.upload.single("image"), (0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin, user_constraint_1.roles.user), user_controllers_1.userController.handleUpdateUserProfileImage);
userRouter
    .route("/change-password")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin, user_constraint_1.roles.user), user_controllers_1.userController.handleChangUserPassword);
userRouter
    .route("/all-users")
    .get((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), user_controllers_1.userController.handleGetAllUsers);
userRouter
    .route("/update-role/:userId")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), user_controllers_1.userController.handleUpdateUserRole);
userRouter
    .route("/delete-user-from-db/:userId")
    .delete((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), user_controllers_1.userController.handleDeleteUserFromDB);
exports.default = userRouter;

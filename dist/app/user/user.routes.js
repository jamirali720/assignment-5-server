"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const authentication_1 = require("../middleware/authentication");
const user_constraint_1 = require("./user.constraint");
const runValidator_1 = require("../middleware/runValidator");
const user_zod_validation_1 = require("./user.zod.validation");
const userRouter = (0, express_1.Router)();
userRouter
    .route("/me")
    .get((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin, user_constraint_1.roles.user), user_controllers_1.userController.handleGetUserProfile);
userRouter
    .route("/me")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin, user_constraint_1.roles.user), (0, runValidator_1.runValidator)(user_zod_validation_1.userUpdateValidationSchema), user_controllers_1.userController.handleUpdateUserProfile);
exports.default = userRouter;

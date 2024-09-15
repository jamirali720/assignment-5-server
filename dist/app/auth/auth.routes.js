"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const runValidator_1 = require("../middleware/runValidator");
const auth_zod_validation_1 = require("./auth.zod.validation");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter
    .route("/signup")
    .post((0, runValidator_1.runValidator)(auth_zod_validation_1.userSignUpValidationSchema), auth_controller_1.authentication.handleSignUpUser);
authRouter
    .route("/login")
    .post((0, runValidator_1.runValidator)(auth_zod_validation_1.userLoginValidationSchema), auth_controller_1.authentication.handleLoginUser);
exports.default = authRouter;

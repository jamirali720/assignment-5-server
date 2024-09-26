"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const runValidator_1 = require("../middleware/runValidator");
const auth_zod_validation_1 = require("./auth.zod.validation");
const auth_controller_1 = require("./auth.controller");
const upload_1 = require("../multer/upload");
const authRouter = (0, express_1.Router)();
authRouter
    .route("/signup")
    .post(upload_1.upload.single("image"), (0, runValidator_1.runValidator)(auth_zod_validation_1.userSignUpValidationSchema), auth_controller_1.authentication.handleSignUpUser);
authRouter
    .route("/login")
    .post(upload_1.upload.none(), (0, runValidator_1.runValidator)(auth_zod_validation_1.userLoginValidationSchema), auth_controller_1.authentication.handleLoginUser);
authRouter.route("/refresh-token").get(auth_controller_1.authentication.handleRefreshToken);
exports.default = authRouter;

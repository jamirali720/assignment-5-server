"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../multer/upload");
const image_controller_1 = require("./image.controller");
const imageRouter = (0, express_1.Router)();
imageRouter.route("/upload-hero-image").post(
// isAuthenticated(roles.admin),
upload_1.upload.single("image"), image_controller_1.ImageController.handleUploadHeroImageTocloudinary);
imageRouter.route("/all-hero-images").get(
// isAuthenticated(roles.admin),
upload_1.upload.single("image"), image_controller_1.ImageController.handleGetAllHeroImages);
imageRouter.route("/delete-hero-image/:id").delete(
// isAuthenticated(roles.admin), 
image_controller_1.ImageController.handleDeleteHeroImage);
exports.default = imageRouter;

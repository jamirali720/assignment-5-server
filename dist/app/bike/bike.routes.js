"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const runValidator_1 = require("../middleware/runValidator");
const bike_controller_1 = require("./bike.controller");
const user_constraint_1 = require("../user/user.constraint");
const bike_zod_validation_1 = require("./bike.zod.validation");
const upload_1 = require("../multer/upload");
const bikeRouter = (0, express_1.Router)();
bikeRouter
    .route("/upload-hero-image")
    .post((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), upload_1.upload.single("image"), (0, runValidator_1.runValidator)(bike_zod_validation_1.createBikeValidationSchema), bike_controller_1.bikeController.handleCreateBike);
bikeRouter
    .route("/create-bike")
    .post((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), upload_1.upload.single("image"), (0, runValidator_1.runValidator)(bike_zod_validation_1.createBikeValidationSchema), bike_controller_1.bikeController.handleCreateBike);
bikeRouter.route("/all-bikes").get(bike_controller_1.bikeController.handleGetAllBikes);
bikeRouter.route("/bikes").get(bike_controller_1.bikeController.handleGetAllBikesWithoutQuery);
bikeRouter.route("/single-bike/:id").get(bike_controller_1.bikeController.handleGetSingleBike);
bikeRouter
    .route("/update-bike/:id")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), upload_1.upload.single("image"), (0, runValidator_1.runValidator)(bike_zod_validation_1.updateBikeValidationSchema), bike_controller_1.bikeController.handleUpdateBike);
bikeRouter
    .route("/delete-bike/:id")
    .delete((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), bike_controller_1.bikeController.handleDeleteBike);
bikeRouter
    .route("/delete-bike-from-db/:id")
    .delete((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), bike_controller_1.bikeController.handleDeleteBikeFromDatabase);
bikeRouter
    .route("/create-review/:id")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.user), bike_controller_1.bikeController.handleCreateReview);
bikeRouter
    .route("/contact")
    .post(bike_controller_1.bikeController.handleContactForm);
exports.default = bikeRouter;

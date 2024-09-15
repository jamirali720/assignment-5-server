"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const runValidator_1 = require("../middleware/runValidator");
const bike_controller_1 = require("./bike.controller");
const user_constraint_1 = require("../user/user.constraint");
const bike_zod_validation_1 = require("./bike.zod.validation");
const bikeRouter = (0, express_1.Router)();
bikeRouter
    .route("/")
    .post((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), (0, runValidator_1.runValidator)(bike_zod_validation_1.createBikeValidationSchema), bike_controller_1.bikeController.handleCreateBike);
bikeRouter.route("/").get(bike_controller_1.bikeController.handleGetAllBikes);
bikeRouter
    .route("/:id")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), (0, runValidator_1.runValidator)(bike_zod_validation_1.updateBikeValidationSchema), bike_controller_1.bikeController.handleUpdateBike);
bikeRouter
    .route("/:id")
    .delete((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), bike_controller_1.bikeController.handleDeleteBike);
exports.default = bikeRouter;

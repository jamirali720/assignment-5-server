"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const authentication_1 = require("../middleware/authentication");
const user_constraint_1 = require("../user/user.constraint");
const runValidator_1 = require("../middleware/runValidator");
const booking_zod_validation_1 = require("./booking.zod.validation");
const rentalRouter = (0, express_1.Router)();
rentalRouter
    .route("/")
    .post((0, authentication_1.isAuthenticated)(user_constraint_1.roles.user), (0, runValidator_1.runValidator)(booking_zod_validation_1.bookingSchemaValidation), booking_controller_1.rentalController.handleCreateRental);
// bike fair calculation
rentalRouter
    .route("/calculate/:id")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), booking_controller_1.rentalController.handleCalculateRental);
// bike return 
rentalRouter
    .route("/:id/return")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.user), booking_controller_1.rentalController.handleReturnRental);
// get rentals by user id
rentalRouter
    .route("/")
    .get((0, authentication_1.isAuthenticated)(user_constraint_1.roles.user), booking_controller_1.rentalController.handleGetRentalsByUserId);
// get all rentals
rentalRouter
    .route("/all-rentals")
    .get((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), booking_controller_1.rentalController.handleGetAllRentals);
// update refund money
rentalRouter
    .route("/update-after-refund/:bookingId")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), booking_controller_1.rentalController.handleUpdateBookingAfterReturnMoney);
//delete rental
rentalRouter
    .route("/delete-rental/:id")
    .delete((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), booking_controller_1.rentalController.handleDeleteBooking);
exports.default = rentalRouter;

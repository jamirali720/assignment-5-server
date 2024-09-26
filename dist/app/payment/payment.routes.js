"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const upload_1 = require("../multer/upload");
const authentication_1 = require("../middleware/authentication");
const user_constraint_1 = require("../user/user.constraint");
const paymentRouter = (0, express_1.Router)();
// payment routes
paymentRouter
    .route("/create-payment-intent")
    .post(upload_1.upload.none(), payment_controller_1.handlePaymentIntent);
// refund payment routes
paymentRouter
    .route("/refunds/:paymentId")
    .post((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), payment_controller_1.handleRefundPayment);
paymentRouter.route("/publishable-key").get(payment_controller_1.handleSendPublishableKey);
exports.default = paymentRouter;

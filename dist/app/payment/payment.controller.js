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
exports.handleSendPublishableKey = exports.handleRefundPayment = exports.handlePaymentIntent = void 0;
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const configs_1 = __importDefault(require("../configs"));
const stripe = require("stripe")(configs_1.default.stripeSecretKey);
// create payment intent
exports.handlePaymentIntent = (0, higherOrderFunction_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        payment_method_types: ["card"],
    });
    res.status(200).json({
        clientSecret: paymentIntent.client_secret,
    });
}));
// create refund payment intent
exports.handleRefundPayment = (0, higherOrderFunction_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refundPayment = yield stripe.refunds.create({
        amount: req.body.amount,
        payment_intent: req.params.paymentId,
    });
    res.status(200).json({ data: refundPayment });
}));
// send publishable key
exports.handleSendPublishableKey = (0, higherOrderFunction_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        publishableKey: configs_1.default.stripePublishableKey,
    });
}));

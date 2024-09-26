"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is required"],
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Bike",
        required: [true, "Bike Id is required"],
    },
    startTime: {
        type: Date,
        required: [true, "Start time is required"],
    },
    returnTime: {
        type: String,
        default: null,
    },
    advanced: {
        type: Number,
        required: [true, "Advanced amount is required"],
        trim: true,
    },
    totalCost: {
        type: Number,
        required: [true, "Total cost is required"],
        default: 0,
    },
    remainingCost: {
        type: Number,
        required: [true, "Remaining cost is required"],
        default: 0,
    },
    isReturned: {
        type: Boolean,
        default: false,
    },
    isReturnedMoney: {
        type: Boolean,
        default: false,
    },
    paymentId: {
        type: String,
        required: [true, "Payment ID is required"],
        trim: true,
    },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);

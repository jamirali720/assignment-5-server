"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Bike is required"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    pricePerHour: {
        type: Number,
        required: [true, "Price per hour is required"],
        trim: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    cc: {
        type: String,
        required: [true, "CC is required"],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, "Year is required"],
        trim: true,
    },
    model: {
        type: String,
        required: [true, "Model is required"],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true,
    },
    image: {
        url: {
            type: String,
            required: [true, "Image url is required"],
        },
        public_id: {
            type: String,
            required: [true, "Public ID is required"],
        },
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            userId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: [true, "User ID is required"],
            },
            username: {
                type: String,
                required: [true, "User name is required"],
            },
            email: {
                type: String,
                required: [true, "Email is required"],
            },
            message: {
                type: String,
                required: [true, "Message is required"],
            },
            rating: {
                type: Number,
                required: [true, "Rating is required"],
            },
        },
    ],
}, { timestamps: true });
exports.Bike = (0, mongoose_1.model)("Bike", bikeSchema);

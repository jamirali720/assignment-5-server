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
exports.bookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
const bike_model_1 = require("../bike/bike.model");
const getTimeDifference_1 = require("../utils/getTimeDifference");
const createRentalService = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    payload.userId = user.userId;
    try {
        session.startTransaction();
        const isBikeExists = yield bike_model_1.Bike.findById(payload.bikeId);
        if (!isBikeExists) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Bike not found with this ID");
        }
        const result = yield booking_model_1.Booking.create([payload], { session });
        if (!result) {
            throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to create booking");
        }
        yield bike_model_1.Bike.findByIdAndUpdate(payload.bikeId, { isAvailable: false });
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const calculateBikeService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isBooking = yield booking_model_1.Booking.findById(id);
        if (!isBooking) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Rental Booking not found with this ID");
        }
        const bikeId = isBooking === null || isBooking === void 0 ? void 0 : isBooking.bikeId;
        const advanced = isBooking === null || isBooking === void 0 ? void 0 : isBooking.advanced;
        const bike = yield bike_model_1.Bike.findByIdAndUpdate(bikeId, { isAvailable: true }, { new: true, runValidators: true, session });
        if (!bike) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Bike not found and failed to update");
        }
        const startTime = new Date(`${isBooking.startTime}`);
        const returnTime = new Date(payload);
        if (startTime.getTime() > returnTime.getTime()) {
            throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Return time should be after start time");
        }
        const rentalHour = (0, getTimeDifference_1.getRentalHour)(startTime, returnTime) / (1000 * 60 * 60);
        const totalCost = rentalHour * bike.pricePerHour;
        const remainingCost = totalCost - advanced;
        const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
            returnTime: returnTime.toISOString(),
            totalCost: totalCost.toFixed(),
            remainingCost: remainingCost.toFixed(),
            isReturnedMoney: remainingCost < advanced ? true : false,
            isReturned: totalCost < advanced ? true : false,
        }, { new: true, runValidators: true, session });
        if (!result) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update booking");
        }
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, error.message);
    }
});
const returnBikeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBooking = yield booking_model_1.Booking.findById(id);
        if (!isBooking) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Rental Booking not found with this ID");
        }
        const bikeId = isBooking === null || isBooking === void 0 ? void 0 : isBooking.bikeId;
        const bike = yield bike_model_1.Bike.findById(bikeId);
        if (!bike) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Bike not found");
        }
        const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
            isReturned: true,
        }, { new: true, runValidators: true });
        if (!result) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update booking");
        }
        return result;
    }
    catch (error) {
        console.log(error);
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, error.message);
    }
});
const updateBookingAfterRefundMoneyService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBooking = yield booking_model_1.Booking.findById(id);
        if (!isBooking) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Rental Booking not found with this ID");
        }
        const result = yield booking_model_1.Booking.findByIdAndUpdate(id, {
            remainingCost: 0,
            isReturnedMoney: false,
        }, { new: true, runValidators: true });
        if (!result) {
            throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update booking");
        }
        return result;
    }
    catch (error) {
        console.log(error);
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, error.message);
    }
});
const getRentalByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findById(id).populate("bikeId");
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return result;
});
const getRentalByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ userId }).populate("bikeId");
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return result;
});
const getAllRentalsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate("bikeId");
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return result;
});
const deleteRentalService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.Booking.findByIdAndDelete(id);
});
exports.bookingServices = {
    createRentalService,
    returnBikeService,
    getRentalByIdService,
    getRentalByUserIdService,
    getAllRentalsService,
    calculateBikeService,
    updateBookingAfterRefundMoneyService,
    deleteRentalService,
};

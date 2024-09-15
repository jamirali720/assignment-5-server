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
exports.rentalController = void 0;
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const booking_services_1 = require("./booking.services");
const handleCreateRental = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingServices.createRentalService(req.user, req.body);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Rental created successfully",
        data: result
    });
}));
const handleReturnRental = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingServices.returnBikeService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Rental Returned successfully",
        data: result
    });
}));
const handleGetAllRentals = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingServices.getAllRentalService(req.user.userId);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result.length === 0 ? "No Data Found" : "Rentals retrieved successfully",
        data: result
    });
}));
exports.rentalController = {
    handleCreateRental,
    handleReturnRental,
    handleGetAllRentals
};

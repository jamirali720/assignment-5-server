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
exports.bikeController = void 0;
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const bike_services_1 = require("./bike.services");
const handleCreateBike = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_services_1.bikeServices.createBikeService(req.body);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Bike added successfully",
        data: result,
    });
}));
const handleGetAllBikes = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_services_1.bikeServices.getAllBikesService();
    console.log(result);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result.length === 0 ? "No Data Found" : "Bikes retrieved successfully",
        data: result,
    });
}));
const handleUpdateBike = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bike_services_1.bikeServices.updateBikeService(id, req.body);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Bike updated successfully",
        data: result,
    });
}));
const handleDeleteBike = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bike_services_1.bikeServices.deleteBikeService(id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result === null ? "No Data Found" : "Bike deleted successfully",
        data: result,
    });
}));
exports.bikeController = {
    handleCreateBike,
    handleGetAllBikes,
    handleUpdateBike,
    handleDeleteBike,
};

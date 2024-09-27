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
const upload_1 = require("../multer/upload");
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const bike_services_1 = require("./bike.services");
const bike_model_1 = require("./bike.model");
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
const handleCreateBike = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield bike_services_1.bikeServices.createBikeService(Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Bike created successfully",
        data: result,
    });
}));
const handleGetAllBikes = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield bike_services_1.bikeServices.getAllBikesService(query);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result.length === 0 ? "No Data Found" : "Bikes retrieved successfully",
        data: result,
    });
}));
const handleGetAllBikesWithoutQuery = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_services_1.bikeServices.getAllBikesWithoutQueryService();
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result.length === 0 ? "No Data Found" : "Bikes retrieved successfully",
        data: result,
    });
}));
const handleGetSingleBike = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_services_1.bikeServices.getSingleBikeService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Bike retrieved successfully",
        data: result,
    });
}));
const handleUpdateBike = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const bike = yield bike_model_1.Bike.findById(id);
    if (!bike) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, `Bike not found with this ${id}`);
    }
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
    }
    yield (0, upload_1.deleteImageFromCloudinary)(bike.image.public_id);
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield bike_services_1.bikeServices.updateBikeService(id, Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result === null ? "Bike updated failed" : "Bike updated successfully",
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
const handleDeleteBikeFromDatabase = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield bike_services_1.bikeServices.deleteBikeFromDBService(id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result === null ? "No Data Found" : "Bike deleted successfully",
        data: result,
    });
}));
const handleCreateReview = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_services_1.bikeServices.createReviewService(req.params.id, Object.assign(Object.assign({}, req.body), req.user));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Review created successfully",
        data: result,
    });
}));
// contact form submit  handler
const handleContactForm = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_services_1.bikeServices.contactFormService(req.body);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contact form submitted successfully",
        data: result,
    });
}));
exports.bikeController = {
    handleCreateBike,
    handleGetAllBikes,
    handleUpdateBike,
    handleGetSingleBike,
    handleDeleteBike,
    handleCreateReview,
    handleDeleteBikeFromDatabase,
    handleGetAllBikesWithoutQuery,
    handleContactForm,
};

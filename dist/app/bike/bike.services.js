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
exports.bikeServices = void 0;
const bike_model_1 = require("./bike.model");
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
const sendEmail_1 = require("../utils/sendEmail");
const createBikeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBike = yield bike_model_1.Bike.create(payload);
    if (!newBike) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to create  new bike");
    }
    return newBike;
});
const uploadHeroImageService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBike = yield bike_model_1.Bike.create(payload);
    if (!newBike) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to create  new bike");
    }
    return newBike;
});
const getSingleBikeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield bike_model_1.Bike.findById(id)
        .populate({
        path: "reviews",
        populate: {
            path: "userId",
        },
    })
        .select("-password");
    if (!bike) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Bike not found");
    }
    return bike;
});
const getAllBikesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchRegExp = new RegExp(".*" + query.name + ".*", "i");
    const filter1 = query.name !== "" ? { name: { $regex: searchRegExp } } : {};
    const filter2 = query.brand !== "All"
        ? { brand: { $regex: query.brand, $options: "i" } }
        : {};
    const filter3 = query.model !== "All"
        ? { model: { $regex: query.model, $options: "i" } }
        : {};
    const filter4 = query.cc !== "All" ? { cc: { $regex: query.cc, $options: "i" } } : {};
    const filter5 = query.year !== "All" ? { year: { $eq: Number(query.year) } } : {};
    const result = yield bike_model_1.Bike.find({
        $and: [filter1, filter2, filter3, filter4, filter5],
    });
    return result;
});
const getAllBikesWithoutQueryService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bike_model_1.Bike.find();
});
const updateBikeService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    const allowedUpdatesFields = [
        "name",
        "description",
        "cc",
        "year",
        "isAvailable",
        "pricePerHour",
        "model",
        "brand",
        "image",
    ];
    if (payload && typeof payload === "object") {
        for (const key in payload) {
            if (allowedUpdatesFields.includes(key)) {
                updates[key] = payload[key];
            }
        }
    }
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, " Bike not found and update failed");
    }
    return result;
});
const deleteBikeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, { isAvailable: false }, { new: true, runValidators: true });
    return result;
});
const deleteBikeFromDBService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.findByIdAndDelete(id);
    return result;
});
const createReviewService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { username, email, message, userId, rating } = payload;
    const newReview = {
        userId,
        username,
        email,
        message,
        rating: Number(rating),
    };
    const bike = yield bike_model_1.Bike.findById(id);
    if (!bike) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Bike not found");
    }
    const isReviewed = (_a = bike.reviews) === null || _a === void 0 ? void 0 : _a.find((review) => review.email === email);
    if (isReviewed) {
        (_b = bike.reviews) === null || _b === void 0 ? void 0 : _b.forEach((review) => {
            if (review.email === email) {
                review.userId = userId;
                review.username = username;
                review.email = email;
                review.message = message;
                review.rating = Number(rating);
            }
        });
    }
    else {
        (_c = bike.reviews) === null || _c === void 0 ? void 0 : _c.push(newReview);
        bike.numberOfReviews = (_d = bike.reviews) === null || _d === void 0 ? void 0 : _d.length;
    }
    let averageRating = 0;
    (_e = bike.reviews) === null || _e === void 0 ? void 0 : _e.forEach((review) => {
        averageRating += review.rating;
    });
    bike.ratings = averageRating / ((_f = bike.reviews) === null || _f === void 0 ? void 0 : _f.length);
    yield bike.save({ validateBeforeSave: false });
    return bike;
});
// contact information for contact section
const contactFormService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, sendEmail_1.sendContactEmail)(payload);
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to send contact information");
    }
    return result;
});
exports.bikeServices = {
    createBikeService,
    getAllBikesService,
    updateBikeService,
    deleteBikeService,
    getSingleBikeService,
    deleteBikeFromDBService,
    uploadHeroImageService,
    createReviewService,
    getAllBikesWithoutQueryService,
    contactFormService,
};

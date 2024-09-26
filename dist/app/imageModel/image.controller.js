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
exports.ImageController = void 0;
const upload_1 = require("../multer/upload");
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
const imageService_1 = require("./imageService");
const imageModel_1 = require("./imageModel");
const handleUploadHeroImageTocloudinary = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield imageService_1.ImageServices.uploadHeroImageService({
        image: { url: resp.secure_url, public_id: resp.public_id },
    });
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Hero Image Uploaded successfully",
        data: result,
    });
}));
const handleGetAllHeroImages = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield imageService_1.ImageServices.getAllHeroImagesService();
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result.length === 0
            ? "No Data Found"
            : "Hero images retrieved successfully",
        data: result,
    });
}));
const handleDeleteHeroImage = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const image = yield imageModel_1.ImageModel.findById(id);
    if (!image) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, `hero image not found with this ${id}`);
    }
    yield (0, upload_1.deleteImageFromCloudinary)(image.image.public_id);
    const result = yield imageService_1.ImageServices.deleteHeroImageService(id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result === null ? "No Data Found" : "Hero Image deleted successfully",
        data: result,
    });
}));
exports.ImageController = {
    handleUploadHeroImageTocloudinary,
    handleGetAllHeroImages,
    handleDeleteHeroImage,
};

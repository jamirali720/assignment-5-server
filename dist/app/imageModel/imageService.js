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
exports.ImageServices = void 0;
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
const imageModel_1 = require("./imageModel");
const uploadHeroImageService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newImage = yield imageModel_1.ImageModel.create(payload);
    if (!newImage) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to upload image");
    }
    return newImage;
});
const getAllHeroImagesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield imageModel_1.ImageModel.find();
    return result;
});
const deleteHeroImageService = (imageId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield imageModel_1.ImageModel.findByIdAndDelete(imageId);
});
exports.ImageServices = {
    uploadHeroImageService,
    getAllHeroImagesService,
    deleteHeroImageService,
};

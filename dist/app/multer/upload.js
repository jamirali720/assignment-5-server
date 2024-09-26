"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloudinary = exports.uploadImageToCloudinary = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const deleteImagePath_1 = require("../utils/deleteImagePath");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadDir = path_1.default.join("/tmp", "uploads");
// Ensure the directory exists
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
//multer function
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
});
const uploadImageToCloudinary = (path, name) => {
    // Upload an image
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, {
            public_id: name,
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
            (0, deleteImagePath_1.deleteImagePath)(path);
        });
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const deleteImageFromCloudinary = (imageId) => {
    // delete an image from cloudinary
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.destroy(imageId, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImagePath = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteImagePath = (path) => {
    fs_1.default.unlink(path, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Image deleted successfully");
    });
};
exports.deleteImagePath = deleteImagePath;

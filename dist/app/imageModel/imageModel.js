"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    image: {
        url: {
            type: String,
            required: [true, "Image URL must be provided"],
        },
        public_id: {
            type: String,
            required: [true, "Public ID must be provided"],
        },
    },
}, { timestamps: true });
exports.ImageModel = (0, mongoose_1.model)("ImageModel", imageSchema);

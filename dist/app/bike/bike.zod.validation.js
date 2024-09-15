"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBikeValidationSchema = exports.createBikeValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be string",
        }),
        pricePerHour: zod_1.z.number({
            required_error: "Price per hour is required",
            invalid_type_error: "Price per hour must be string",
        }),
        isAvailable: zod_1.z.boolean().default(true),
        cc: zod_1.z.number({
            required_error: "Cc is required",
            invalid_type_error: "Cc must be number",
        }),
        year: zod_1.z.number({
            required_error: "Year is required",
            invalid_type_error: "Year must be number",
        }),
        model: zod_1.z.string({
            required_error: "Model is required",
            invalid_type_error: "Model must be string",
        }),
        brand: zod_1.z.string({
            required_error: "Brand is required",
            invalid_type_error: "Brand must be string",
        }),
    }),
});
exports.updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().default(true).optional(),
        cc: zod_1.z.number().optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }),
});

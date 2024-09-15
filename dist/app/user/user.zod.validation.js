"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidationSchema = void 0;
const zod_1 = require("zod");
exports.userUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
        }),
        phone: zod_1.z
            .string({
            required_error: "Phone is required",
            invalid_type_error: "Phone must be string",
        })
    }),
});

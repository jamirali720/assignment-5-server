"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationSchema = exports.userSignUpValidationSchema = void 0;
const zod_1 = require("zod");
const user_constraint_1 = require("../user/user.constraint");
exports.userSignUpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be string",
        })
            .email({ message: "Provided email is INVALID" }),
        password: zod_1.z
            .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be string",
        })
            .min(6, { message: "Password must be at least 6 characters" }),
        phone: zod_1.z.string(),
        address: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "Address must be string",
        }),
        role: zod_1.z.enum([...user_constraint_1.role]).default("user"),
    })
});
exports.userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be string",
        })
            .email({ message: "Provided email is INVALID" }),
        password: zod_1.z
            .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be string",
        })
            .min(6, { message: "Password must be at least 6 characters" }),
    }),
});

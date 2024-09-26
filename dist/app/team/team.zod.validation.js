"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamMemberValidationSchema = exports.createTeamMemberValidationSchema = void 0;
const zod_1 = require("zod");
exports.createTeamMemberValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
        }),
        role: zod_1.z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be string",
        }),
    }),
});
exports.updateTeamMemberValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
    }),
});

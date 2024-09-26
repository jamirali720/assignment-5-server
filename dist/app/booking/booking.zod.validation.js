"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchemaValidation = void 0;
const zod_1 = require("zod");
exports.bookingSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string({ required_error: "Bike id is required" }),
        paymentId: zod_1.z.string({ required_error: "Payment ID id is required" }),
        startTime: zod_1.z
            .string({ required_error: "Start time  is required" })
            .datetime(),
        advanced: zod_1.z.number({ required_error: "Advanced amount is required" }),
    }),
});

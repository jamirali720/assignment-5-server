"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodErrors = void 0;
const handleZodErrors = (err) => {
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode: 400,
        message: "Zod Validation failed",
        errorSource,
    };
};
exports.handleZodErrors = handleZodErrors;

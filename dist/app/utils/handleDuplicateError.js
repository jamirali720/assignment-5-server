"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const errorSource = [
        {
            path: err.keyValue,
            message: err.message,
        },
    ];
    return {
        statusCode: 400,
        message: err.message,
        errorSource,
    };
};
exports.default = handleDuplicateError;

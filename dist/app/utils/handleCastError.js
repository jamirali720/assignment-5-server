"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastErrors = (err) => {
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode: 400,
        message: "Invalid ID",
        errorSource,
    };
};
exports.default = handleCastErrors;

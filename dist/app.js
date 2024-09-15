"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const error_1 = require("./app/utils/error");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
// main router
app.use("/api", routes_1.default);
// home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "My assignment-3 server is OK",
    });
});
// not found route
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
// global error handler
app.use(error_1.handleError);
exports.default = app;

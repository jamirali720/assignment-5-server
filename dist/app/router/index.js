"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const user_routes_1 = __importDefault(require("../user/user.routes"));
const bike_routes_1 = __importDefault(require("../bike/bike.routes"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
    {
        path: "/users",
        route: user_routes_1.default,
    },
    {
        path: "/bikes",
        route: bike_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

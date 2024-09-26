"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const user_routes_1 = __importDefault(require("../user/user.routes"));
const bike_routes_1 = __importDefault(require("../bike/bike.routes"));
const booking_routes_1 = __importDefault(require("../booking/booking.routes"));
const imageRoute_1 = __importDefault(require("../imageModel/imageRoute"));
const team_routes_1 = __importDefault(require("../team/team.routes"));
const payment_routes_1 = __importDefault(require("../payment/payment.routes"));
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
    {
        path: "/rentals",
        route: booking_routes_1.default,
    },
    {
        path: "/images",
        route: imageRoute_1.default,
    },
    {
        path: "/teams",
        route: team_routes_1.default,
    },
    {
        path: "/payment",
        route: payment_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

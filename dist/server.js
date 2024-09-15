"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = __importDefault(require("./app/configs"));
const app_1 = __importDefault(require("./app"));
let server;
const databaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(configs_1.default.databaseUrl);
        console.log("Database connected successfully");
        server = app_1.default.listen(configs_1.default.port, () => {
            console.log(`My assignment-3 server is running on port ${configs_1.default.port}`);
        });
    }
    catch (error) {
        console.error("database connection failed");
    }
});
databaseConnection();
process.on("uncaughtException", () => {
    console.log("uncaughtException is detected. Server shutting down..");
    process.exit(1);
});
process.on("unhandledRejection", () => {
    console.log("unhandledRejection is detected. Server shutting down");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

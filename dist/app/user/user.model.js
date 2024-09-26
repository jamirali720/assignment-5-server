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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = __importDefault(require("../configs"));
const user_constraint_1 = require("./user.constraint");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 3 characters"],
    },
    phone: {
        type: String,
        required: [true, "User phone number required"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    role: {
        type: String,
        default: user_constraint_1.roles.user,
        enum: [user_constraint_1.roles.admin, user_constraint_1.roles.user],
    },
    image: {
        url: {
            type: String,
            required: [true, "Image URL is required"],
        },
        public_id: {
            type: String,
            required: [true, "Public ID is required"],
        },
    },
}, { timestamps: true });
// password hashing before saving user
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(configs_1.default.saltRound));
        if (this.email === configs_1.default.adminEmail) {
            this.role = "admin";
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);

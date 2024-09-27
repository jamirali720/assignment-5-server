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
exports.sendContactEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const configs_1 = __importDefault(require("../configs"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: configs_1.default.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
        user: configs_1.default.adminEmail,
        pass: configs_1.default.smtpPassword,
    },
});
const sendContactEmail = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    // send mail with defined transport object
    const info = yield transporter.sendMail({
        from: configs_1.default.adminEmail,
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        text: emailData.message, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    return info.response;
});
exports.sendContactEmail = sendContactEmail;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Bike is required"],
        trim: true,
    },
    facebookLink: String,
    twitterLink: String,
    linkedinLink: String,
    githubLink: String,
    youtubeLink: String,
    instagramLink: String,
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: [
            "CEO",
            "CEO & Founder",
            "COO",
            "CFO",
            "CMP",
            "CTO",
            "CIO",
            "CHRO",
            "CPO",
            "Marketing Manager",
            "Sales Director",
            "Brand Manager",
            "Operations Manager",
            "Controller",
        ],
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
exports.Team = (0, mongoose_1.model)("Team", teamSchema);

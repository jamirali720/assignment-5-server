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
exports.TeamServices = void 0;
const team_model_1 = require("./team.model");
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
const createTeamService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const teamMember = yield team_model_1.Team.create(payload);
    if (!teamMember) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to create  new team member");
    }
    return teamMember;
});
const getSingleMemberService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const teamMember = yield team_model_1.Team.findById(id);
    if (!teamMember) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Team member not found");
    }
    return teamMember;
});
const getAllTeamsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchRegExp = new RegExp(".*" + query + ".*", "i");
    const filter = query !== "" ? { name: { $regex: searchRegExp } } : {};
    const result = yield team_model_1.Team.find(filter);
    return result;
});
const updateTeamService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    const allowedUpdatesFields = ["name", "role", "image", "education", "skills", "experience", "achievements",];
    if (payload && typeof payload === "object") {
        for (const key in payload) {
            if (allowedUpdatesFields.includes(key)) {
                updates[key] = payload[key];
            }
        }
    }
    const result = yield team_model_1.Team.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, " Team not found and update failed");
    }
    return result;
});
const deleteTeamService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield team_model_1.Team.findByIdAndDelete(id);
});
exports.TeamServices = {
    createTeamService,
    getAllTeamsService,
    getSingleMemberService,
    updateTeamService,
    deleteTeamService,
};

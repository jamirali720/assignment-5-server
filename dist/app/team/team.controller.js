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
exports.TeamController = void 0;
const upload_1 = require("../multer/upload");
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const error_1 = require("../utils/error");
const http_status_1 = __importDefault(require("http-status"));
const teams_services_1 = require("./teams.services");
const team_model_1 = require("./team.model");
const handleCreateTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield teams_services_1.TeamServices.createTeamService(Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Team created successfully",
        data: result,
    });
}));
const handleGetAllTeams = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.name || "";
    const result = yield teams_services_1.TeamServices.getAllTeamsService(query);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result.length === 0 ? "No Data Found" : "Teams retrieved successfully",
        data: result,
    });
}));
const handleGetSingleTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield teams_services_1.TeamServices.getSingleMemberService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Team retrieved successfully",
        data: result,
    });
}));
const handleUpdateTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const team = yield team_model_1.Team.findById(id);
    if (!team) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, `Team not found with this ${id}`);
    }
    yield (0, upload_1.deleteImageFromCloudinary)(team.image.public_id);
    const resp = (yield (0, upload_1.uploadImageToCloudinary)(req.file.path, req.file.filename));
    const result = yield teams_services_1.TeamServices.updateTeamService(id, Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result === null ? "Team updated failed" : "Team updated successfully",
        data: result,
    });
}));
const handleDeleteTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield teams_services_1.TeamServices.deleteTeamService(id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: result === null ? "No Data Found" : "Team deleted successfully",
        data: result,
    });
}));
exports.TeamController = {
    handleCreateTeam,
    handleGetAllTeams,
    handleUpdateTeam,
    handleGetSingleTeam,
    handleDeleteTeam,
};

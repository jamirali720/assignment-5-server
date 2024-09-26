"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const runValidator_1 = require("../middleware/runValidator");
const user_constraint_1 = require("../user/user.constraint");
const team_zod_validation_1 = require("./team.zod.validation");
const upload_1 = require("../multer/upload");
const team_controller_1 = require("./team.controller");
const teamRouter = (0, express_1.Router)();
teamRouter
    .route("/create-team")
    .post((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), upload_1.upload.single("image"), (0, runValidator_1.runValidator)(team_zod_validation_1.createTeamMemberValidationSchema), team_controller_1.TeamController.handleCreateTeam);
teamRouter.route("/team-members").get(team_controller_1.TeamController.handleGetAllTeams);
teamRouter.route("/single-member/:id").get(team_controller_1.TeamController.handleGetSingleTeam);
teamRouter
    .route("/update-member/:id")
    .put((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), upload_1.upload.single("image"), (0, runValidator_1.runValidator)(team_zod_validation_1.updateTeamMemberValidationSchema), team_controller_1.TeamController.handleUpdateTeam);
teamRouter
    .route("/delete-member/:id")
    .delete((0, authentication_1.isAuthenticated)(user_constraint_1.roles.admin), team_controller_1.TeamController.handleDeleteTeam);
exports.default = teamRouter;

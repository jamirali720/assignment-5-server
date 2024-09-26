import { Router } from "express";

import { isAuthenticated } from "../middleware/authentication";

import { runValidator } from "../middleware/runValidator";

import { roles } from "../user/user.constraint";
import { createTeamMemberValidationSchema, updateTeamMemberValidationSchema } from "./team.zod.validation";
import { upload } from "../multer/upload";
import { TeamController } from "./team.controller";

const teamRouter = Router();

teamRouter
  .route("/create-team")
  .post(
    isAuthenticated(roles.admin),
    upload.single("image"),
    runValidator(createTeamMemberValidationSchema),
    TeamController.handleCreateTeam
  );
teamRouter.route("/team-members").get(TeamController.handleGetAllTeams);

teamRouter.route("/single-member/:id").get(   
  TeamController.handleGetSingleTeam
);


teamRouter
  .route("/update-member/:id")
  .put(
    isAuthenticated(roles.admin),
    upload.single("image"),
    runValidator(updateTeamMemberValidationSchema),
    TeamController.handleUpdateTeam
  );


teamRouter
  .route("/delete-member/:id")
  .delete(
    isAuthenticated(roles.admin),
     TeamController.handleDeleteTeam);

     


export default teamRouter;

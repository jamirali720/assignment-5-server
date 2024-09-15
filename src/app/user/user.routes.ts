import { Router } from "express";
import { userController } from "./user.controllers";
import { isAuthenticated } from "../middleware/authentication";
import { roles } from "./user.constraint";
import { runValidator } from "../middleware/runValidator";
import { userUpdateValidationSchema } from "./user.zod.validation";

const userRouter = Router();
userRouter
  .route("/profile")
  .get(
    isAuthenticated(roles.admin, roles.user),
    userController.handleGetUserProfile
  );

  
userRouter
  .route("/update-profile")
  .put(
    isAuthenticated(roles.admin, roles.user),
    runValidator(userUpdateValidationSchema),
    userController.handleUpdateUserProfile
  );
export default userRouter;

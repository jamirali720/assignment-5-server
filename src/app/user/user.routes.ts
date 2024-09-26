import { Router } from "express";
import { userController } from "./user.controllers";
import { isAuthenticated } from "../middleware/authentication";
import { roles } from "./user.constraint";
import { runValidator } from "../middleware/runValidator";
import { userUpdateValidationSchema } from "./user.zod.validation";
import { upload } from "../multer/upload";


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

userRouter
  .route("/update-profile-image")
  .put(
    upload.single("image"),
    isAuthenticated(roles.admin, roles.user),
    userController.handleUpdateUserProfileImage
  );
userRouter
  .route("/change-password")
  .put(
    isAuthenticated(roles.admin, roles.user),
    userController.handleChangUserPassword
  );
userRouter
  .route("/all-users")
  .get(
    isAuthenticated(roles.admin),
    userController.handleGetAllUsers
  );
userRouter
  .route("/update-role/:userId")
  .put(isAuthenticated(roles.admin), userController.handleUpdateUserRole);

userRouter
  .route("/delete-user-from-db/:userId")
  .delete(
    isAuthenticated(roles.admin),
    userController.handleDeleteUserFromDB
  );
export default userRouter;

import { Router } from "express";
import { runValidator } from "../middleware/runValidator";
import {
  userSignUpValidationSchema,
  userLoginValidationSchema,
} from "./auth.zod.validation";

import { authentication } from "./auth.controller";
import { upload } from "../multer/upload";


const authRouter = Router();
authRouter
  .route("/signup")
  .post(
    upload.single("image"),
    runValidator(userSignUpValidationSchema),
    authentication.handleSignUpUser
  );

authRouter
  .route("/login")
  .post(
    upload.none(),
    runValidator(userLoginValidationSchema),
    authentication.handleLoginUser
  );

  
authRouter.route("/refresh-token").get(authentication.handleRefreshToken);

export default authRouter;

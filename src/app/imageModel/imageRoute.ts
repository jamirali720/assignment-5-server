import { Router } from "express";

import { isAuthenticated } from "../middleware/authentication";

import { roles } from "../user/user.constraint";

import { upload } from "../multer/upload";
import { ImageController } from "./image.controller";

const imageRouter = Router();

imageRouter.route("/upload-hero-image").post(
  // isAuthenticated(roles.admin),
  upload.single("image"),
  ImageController.handleUploadHeroImageTocloudinary
);

imageRouter.route("/all-hero-images").get(
    // isAuthenticated(roles.admin),
    upload.single("image"),
    ImageController.handleGetAllHeroImages
);

imageRouter.route("/delete-hero-image/:id").delete(
      // isAuthenticated(roles.admin), 
  ImageController.handleDeleteHeroImage
);



export default imageRouter;

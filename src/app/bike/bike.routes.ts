import { Router } from "express";

import { isAuthenticated } from "../middleware/authentication";

import { runValidator } from "../middleware/runValidator";
import { bikeController } from "./bike.controller";
import { roles } from "../user/user.constraint";
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from "./bike.zod.validation";
import { upload } from "../multer/upload";

const bikeRouter = Router();

bikeRouter
  .route("/upload-hero-image")
  .post(
    isAuthenticated(roles.admin),
    upload.single("image"),
    runValidator(createBikeValidationSchema),
    bikeController.handleCreateBike
  );

bikeRouter
  .route("/create-bike")
  .post(
    isAuthenticated(roles.admin),
    upload.single("image"),
    runValidator(createBikeValidationSchema),
    bikeController.handleCreateBike
  );
bikeRouter.route("/all-bikes").get(bikeController.handleGetAllBikes);
bikeRouter.route("/bikes").get(bikeController.handleGetAllBikesWithoutQuery);

bikeRouter.route("/single-bike/:id").get(   
  bikeController.handleGetSingleBike
);


bikeRouter
  .route("/update-bike/:id")
  .put(
    isAuthenticated(roles.admin),
    upload.single("image"),
    runValidator(updateBikeValidationSchema),
    bikeController.handleUpdateBike
  );


bikeRouter
  .route("/delete-bike/:id")
  .delete(
    isAuthenticated(roles.admin),
     bikeController.handleDeleteBike);

bikeRouter
  .route("/delete-bike-from-db/:id")
  .delete(
    isAuthenticated(roles.admin),
     bikeController.handleDeleteBikeFromDatabase);

     
bikeRouter
  .route("/create-review/:id")
  .put(
    isAuthenticated(roles.user),
     bikeController.handleCreateReview);

export default bikeRouter;

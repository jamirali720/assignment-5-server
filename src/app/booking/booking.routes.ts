import { Router } from "express";
import { rentalController } from "./booking.controller";
import { isAuthenticated } from "../middleware/authentication";
import { roles } from "../user/user.constraint";
import { runValidator } from "../middleware/runValidator";
import { bookingSchemaValidation } from "./booking.zod.validation";

const rentalRouter = Router();

rentalRouter
  .route("/")
  .post(
    isAuthenticated(roles.user),
    runValidator(bookingSchemaValidation),
    rentalController.handleCreateRental
  );

rentalRouter
  .route("/:id/return")
  .put(isAuthenticated(roles.admin), rentalController.handleReturnRental);

rentalRouter
  .route("/")
  .get(isAuthenticated(roles.user), rentalController.handleGetAllRentals);

export default rentalRouter;

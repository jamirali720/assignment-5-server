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

  // bike fair calculation
rentalRouter
  .route("/calculate/:id")
  .put(isAuthenticated(roles.admin), rentalController.handleCalculateRental);


  // bike return 
rentalRouter
  .route("/:id/return")
  .put(isAuthenticated(roles.user), rentalController.handleReturnRental);

  // get rentals by user id
rentalRouter
  .route("/")
  .get(isAuthenticated(roles.user), rentalController.handleGetRentalsByUserId);


  // get all rentals
rentalRouter
  .route("/all-rentals")
  .get(isAuthenticated(roles.admin), rentalController.handleGetAllRentals);


  // update refund money
rentalRouter
  .route("/update-after-refund/:bookingId")
  .put(
    isAuthenticated(roles.admin),
    rentalController.handleUpdateBookingAfterReturnMoney
  );

  //delete rental
rentalRouter
  .route("/delete-rental/:id")
  .delete(isAuthenticated(roles.admin), rentalController.handleDeleteBooking);

export default rentalRouter;

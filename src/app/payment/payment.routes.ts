import { Router } from "express";
import {
  handlePaymentIntent,
  handleRefundPayment,
  handleSendPublishableKey,
} from "./payment.controller";

import { upload } from "../multer/upload";
import { isAuthenticated } from "../middleware/authentication";
import { roles } from "../user/user.constraint";

const paymentRouter = Router();

// payment routes
paymentRouter
  .route("/create-payment-intent")
  .post(upload.none(), handlePaymentIntent);

// refund payment routes
paymentRouter
  .route("/refunds/:paymentId")
  .post( isAuthenticated(roles.admin), handleRefundPayment);
  
paymentRouter.route("/publishable-key").get(handleSendPublishableKey);

export default paymentRouter;

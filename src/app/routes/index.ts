import { Router } from "express";
import authRouter from "../auth/auth.routes";
import userRouter from "../user/user.routes";
import bikeRouter from "../bike/bike.routes";
import rentalRouter from "../booking/booking.routes";
import imageRouter from "../imageModel/imageRoute";
import teamRouter from "../team/team.routes";
import paymentRouter from "../payment/payment.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/bikes",
    route: bikeRouter,
  },
  {
    path: "/rentals",
    route: rentalRouter,
  },
  {
    path: "/images",
    route: imageRouter,
  },
  {
    path: "/teams",
    route: teamRouter,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

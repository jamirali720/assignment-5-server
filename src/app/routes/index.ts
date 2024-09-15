import { Router } from "express";
import authRouter from "../auth/auth.routes";
import userRouter from "../user/user.routes";
import bikeRouter from "../bike/bike.routes";
import rentalRouter from "../booking/booking.routes";
import imageRouter from "../imageModel/imageRoute";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

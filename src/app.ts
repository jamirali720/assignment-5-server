import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { handleError } from "./app/utils/error";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://assignment-5-client-brown.vercel.app", credentials: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// main router
app.use("/api", router);

// home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "My assignment-5 server is OK",
  });
});
// not found route
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

// global error handler
app.use(handleError);

export default app;

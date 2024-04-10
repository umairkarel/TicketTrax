import express from "express";
// should import it after express
import "express-async-errors";
import cookieSession from "cookie-session";
import { config } from "dotenv";
import { ErrorMiddleware } from "./middlewares/error.js";
import ErrorHandler from "./utils/error-handler.js";
import { ErrorMessages, HTTP_STATUS_CODE } from "./constants/server-errors.js";

// Set .env file path
config({
  path: ".env",
  encoding: "utf-8",
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// All your Router's goes here
app.all("*", () => {
  // not found route
  // app.all represents GET, POST, PUT, PATCH, etc.
  throw new ErrorHandler(
    ErrorMessages.ResourceNotFound,
    HTTP_STATUS_CODE.NotFound
  );
});

app.use(ErrorMiddleware);

export default app;

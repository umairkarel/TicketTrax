import * as UserService from "../services/user.service.js";
import ErrorHandler from "../utils/error-handler.js";
import { ErrorMessages, HTTP_STATUS_CODE } from "../constants/server-errors.js";
import { ServerMessages } from "../constants/server-messages.js";
import { createSession, destroySession } from "../utils/session-handler.js";
import logger from "../utils/logger.js";

export const getCurrentUser = async (req, res) => {
  logger.info(`User Controller | get current user.`);

  res
    .status(HTTP_STATUS_CODE.Ok)
    .json({ success: true, currentUser: req?.user });
};

export const registerUser = async (req, res) => {
  logger.info(`User Controller | register user.`);

  const { email, password } = req.body;

  const userExists = await UserService.getUserByEmail(email);
  if (userExists) {
    throw new ErrorHandler(
      ErrorMessages.UserAlreadyExists,
      HTTP_STATUS_CODE.BadRequest
    );
  }

  const user = await UserService.registerUser({
    email,
    password,
  });

  // Creating Login Session
  createSession(req, user);

  res.status(HTTP_STATUS_CODE.Created).json({ success: true, user });
};

export const loginUser = async (req, res) => {
  logger.info(`User Controller | login user.`);

  const { email, password } = req.body;

  const user = await UserService.getUserByEmail(email);
  if (!user)
    throw new ErrorHandler(
      ErrorMessages.UserNotFound,
      HTTP_STATUS_CODE.NotFound
    );

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    throw new ErrorHandler(
      ErrorMessages.InvalidCredentials,
      HTTP_STATUS_CODE.BadRequest
    );

  // Creating Login Session
  createSession(req, user);

  res.status(HTTP_STATUS_CODE.Ok).json({ success: true, user });
};

export const logoutUser = async (req, res) => {
  logger.info(`User Controller | logout user.`);

  destroySession(req);

  res
    .status(HTTP_STATUS_CODE.Ok)
    .json({ success: true, message: ServerMessages.UserLoggedOut });
};

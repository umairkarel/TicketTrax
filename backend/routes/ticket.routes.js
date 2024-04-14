import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controllers.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticatedUser, getTickets)
  .post(isAuthenticatedUser, createTicket);

router
  .route("/:id")
  .get(isAuthenticatedUser, getTicket)
  .put(isAuthenticatedUser, updateTicket);

export default router;

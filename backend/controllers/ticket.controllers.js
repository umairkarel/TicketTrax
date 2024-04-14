import * as TicketService from "../services/ticket.services.js";
import ErrorHandler from "../utils/error-handler.js";
import {
  AppErrorMessages,
  ErrorMessages,
  HTTP_STATUS_CODE,
} from "../constants/server-errors.js";
import { ServerMessages } from "../constants/server-messages.js";

export const getTickets = async (req, res) => {
  const tickets = await TicketService.getTickets();

  res.status(HTTP_STATUS_CODE.Ok).json({
    success: true,
    tickets,
  });
};

export const getTicket = async (req, res) => {
  const ticket = await TicketService.getTicketById(req.params.id);

  if (!ticket)
    throw new ErrorHandler(
      AppErrorMessages.TicketNotFound,
      HTTP_STATUS_CODE.NotFound
    );

  res.status(HTTP_STATUS_CODE.Ok).json({ success: true, ticket });
};

export const createTicket = async (req, res) => {
  const { title, price } = req.body;

  const ticket = await TicketService.createTicket({
    title,
    price,
    userId: req.currentUser?.id,
  });

  res
    .status(HTTP_STATUS_CODE.Created)
    .json({ success: true, message: ServerMessages.TicketCreated, ticket });
};

export const updateTicket = async (req, res) => {
  const ticket = await TicketService.updateTicket(req.params.id);

  if (!ticket) {
    throw new ErrorHandler(
      AppErrorMessages.TicketNotFound,
      HTTP_STATUS_CODE.NotFound
    );
  }

  // Only the owner can update ticket
  if (ticket.userId !== req.currentUser?.id) {
    throw new ErrorHandler(
      `${ErrorMessages.UnauthorisedAccess}`,
      HTTP_STATUS_CODE.Unauthorised
    );
  }

  res
    .status(HTTP_STATUS_CODE.Ok)
    .json({ success: true, message: ServerMessages.TicketUpdated, ticket });
};

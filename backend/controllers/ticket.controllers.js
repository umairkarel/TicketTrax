import * as TicketService from "../services/ticket.services.js";
import ErrorHandler from "../utils/error-handler.js";
import {
  AppErrorMessages,
  ErrorMessages,
  HTTP_STATUS_CODE,
} from "../constants/errors.js";
import { AppServerMessages, ServerMessages } from "../constants/messages.js";

/**
 * Retrieves all tickets.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves once the operation is complete.
 */
export const getTickets = async (req, res) => {
  const tickets = await TicketService.getTickets();

  res.status(HTTP_STATUS_CODE.Ok).json({
    success: true,
    tickets,
  });
};

/**
 * Retrieves a ticket by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves once the operation is complete.
 */
export const getTicket = async (req, res) => {
  const ticket = await TicketService.getTicketById(req.params.id);

  if (!ticket)
    throw new ErrorHandler(
      AppErrorMessages.TicketNotFound,
      HTTP_STATUS_CODE.NotFound,
    );

  res.status(HTTP_STATUS_CODE.Ok).json({ success: true, ticket });
};

/**
 * Creates a new ticket.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves once the operation is complete.
 */
export const createTicket = async (req, res) => {
  const { title, price } = req.body;

  const ticket = await TicketService.createTicket({
    title,
    price,
    userId: req.currentUser?.id,
  });

  res.status(HTTP_STATUS_CODE.Created).json({
    success: true,
    message: ServerMessages.TicketCreated,
    ticket,
  });
};

/**
 * Updates an existing ticket by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves once the operation is complete.
 */
export const updateTicket = async (req, res) => {
  const ticket = await TicketService.updateTicket(req.params.id);

  if (!ticket) {
    throw new ErrorHandler(
      AppErrorMessages.TicketNotFound,
      HTTP_STATUS_CODE.NotFound,
    );
  }

  // Only the owner can update ticket
  if (ticket.userId !== req.currentUser?.id) {
    throw new ErrorHandler(
      `${ErrorMessages.UnauthorisedAccess}`,
      HTTP_STATUS_CODE.Unauthorised,
    );
  }

  res.status(HTTP_STATUS_CODE.Ok).json({
    success: true,
    message: ServerMessages.TicketUpdated,
    ticket,
  });
};

/**
 * Buys a ticket by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves once the operation is complete.
 */
export const buyTicket = async (req, res) => {
  const ticketId = req.params?.id;
  const ticket = await TicketService.getTicketById(ticketId);

  if (!ticket) {
    throw new ErrorHandler(
      AppErrorMessages.TicketNotFound,
      HTTP_STATUS_CODE.NotFound,
    );
  }

  // Check if the ticket is already sold
  if (ticket.isSold) {
    throw new ErrorHandler(
      AppErrorMessages.TicketAlreadySold,
      HTTP_STATUS_CODE.BadRequest,
    );
  }

  // Update the ticket and user data
  await TicketService.updateTicket(ticketId, {
    isSold: true,
    boughtBy: req.currentUser?.id,
    soldDate: new Date(),
  });

  res.status(HTTP_STATUS_CODE.Ok).json({
    success: true,
    message: AppServerMessages.TicketBought,
    ticket,
  });
};

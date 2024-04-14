import { Ticket } from "../models/ticket.model.js";
import logger from "../utils/logger.js";

export const getTickets = async () => {
  logger.info(`Ticket Service | Get all tickets`);
  return Ticket.find({});
};

export const getTicketById = async (ticketId) => {
  logger.info(`Ticket Service | Get ticket by id ${ticketId}`);

  return Ticket.findById(ticketId);
};

export const createTicket = async (payload) => {
  logger.info(`Ticket Service | Create ticket`);

  return Ticket.create(payload);
};

export const updateTicket = async (payload, ticketId) => {
  logger.info(`Ticket Service | Update ticket by id ${ticketId}`);

  return Ticket.findByIdAndUpdate(ticketId, payload);
};

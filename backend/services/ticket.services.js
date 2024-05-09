import { Ticket } from "../models/ticket.model.js";
import logger from "../utils/logger.js";

/**
 * Retrieves all tickets.
 *
 * @returns {Promise<Ticket[]>} All tickets
 */
export const getTickets = async () => {
  logger.info(`Ticket Service | Get all tickets`);

  // Returns all tickets
  return Ticket.find({});
};

/**
 * Get a ticket by its ID.
 *
 * @param {string} ticketId - The ID of the ticket to retrieve
 * @returns {Promise<Ticket>} The ticket
 */
export const getTicketById = async (ticketId) => {
  logger.info(`Ticket Service | Get ticket by id ${ticketId}`);

  // Retrieve a ticket by its ID
  return Ticket.findById(ticketId);
};

/**
 * Create a new ticket.
 *
 * @param {Object} payload - The data to create the ticket with
 * @returns {Promise} The created ticket
 */
export const createTicket = async (payload) => {
  logger.info(`Ticket Service | Create ticket`);

  // Creates a new ticket in the database
  return Ticket.create(payload);
};

/**
 * Updates an existing ticket by its ID.
 *
 * @param {string} ticketId - The ID of the ticket to update
 * @param {Object} payload - The data to update the ticket with
 * @returns {Promise<Ticket>} The updated ticket
 */
export const updateTicket = async (ticketId, payload) => {
  /**
   * Finds a ticket by its ID and updates it with the given payload.
   * Returns the updated ticket.
   */
  logger.info(`Ticket Service | Update ticket by id ${ticketId}`);

  return Ticket.findByIdAndUpdate(ticketId, payload, {
    new: true, // Returns the updated document instead of the original
    runValidators: true, // Runs any update validators on the document
  });
};

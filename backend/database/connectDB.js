import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { ServerMessages } from "../constants/server-messages.js";

/**
 * connectDB - Connect to MongoDB URI
 */
export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI);
  logger.info(`${ServerMessages.DatabaseConnected}: ${connection.host}`);
};

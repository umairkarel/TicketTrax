import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who listed the ticket
      required: true,
    },
    boughtBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who bought the ticket
    },
    soldDate: {
      type: Date,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  {
    /**
     * Transforms the given document into a plain object and removes the _id field,
     * replacing it with an id field.
     *
     * @param {Object} doc - The document to be transformed.
     * @param {Object} ret - The plain object representation of the document.
     * @return {Object} The transformed plain object without the _id field.
     */
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

export const Ticket = mongoose.model("Ticket", ticketSchema);

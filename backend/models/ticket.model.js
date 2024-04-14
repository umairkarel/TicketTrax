import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);

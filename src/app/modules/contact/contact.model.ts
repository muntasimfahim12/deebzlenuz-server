import mongoose, { Schema } from "mongoose";
import { TContact } from "./contact.interface";

const contactSchema = new Schema<TContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },

    inquiryType: {
      type: String,
      enum: ["Booking", "Collab", "Press", "General"],
      required: true,
    },

    message: { type: String, required: true },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<TContact>("Contact", contactSchema);
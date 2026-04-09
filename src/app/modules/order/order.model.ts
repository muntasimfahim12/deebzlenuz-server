import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    customer: Object,
    shipping: Object,
    pricing: Object,
    items: [Object],

    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentSessionId: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<TOrder>("Order", orderSchema);
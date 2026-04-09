import mongoose, { Schema } from "mongoose";
import { TSubscriber } from "./subsriber.interface";

const subscriberSchema = new Schema<TSubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true, // 🚀 prevent duplicate
    },

    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },

    source: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model<TSubscriber>(
  "Subscriber",
  subscriberSchema
);
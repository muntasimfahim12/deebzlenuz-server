import mongoose, { Schema } from "mongoose";
import { TTestimonial } from "./testimonial.interface";

const testimonialSchema = new Schema<TTestimonial>(
  {
    name: { type: String, required: true },
    role: String,
    company: String,

    message: { type: String, required: true },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    avatar: String,

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model<TTestimonial>(
  "Testimonial",
  testimonialSchema
);
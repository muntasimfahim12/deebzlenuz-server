import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtext: String,

    price: {
      amount: Number,
      currency: String,
      sale_price: Number,
    },

    category: String,
    tag: String,

    mainImage: String,
    hoverImage: String,
    gallery: [String],

    description: String,

    colors: [
      {
        name: String,
        hex: String,
      },
    ],

    sizes: [String],

    inventory: {
      S: Number,
      M: Number,
      L: Number,
      XL: Number,
      XXL: Number,
      low_stock_threshold: Number,
    },

    highlights: [
      {
        title: String,
        desc: String,
        icon: String,
      },
    ],

    social_proof: {
      rating: Number,
      review_count: Number,
      status: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<TProduct>("Product", productSchema);
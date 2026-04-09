import mongoose, { Schema } from "mongoose";
import { TAlbum } from "./album.interface";

const albumSchema = new Schema<TAlbum>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    cover_image: String,

    main_genre: String,
    release_year: String,

    total_tracks: String,
    duration: String,

    description: String,
    tag: String,

    rating: Number,
    review_count: Number,

    formats: [
      {
        id: String,
        label: String,
        sub: String,
        price: Number,
        type: String,
        badge: String,
        isHot: Boolean,
      },
    ],

    bundle_deal: {
      title: String,
      items: String,
      price: Number,
      old_price: Number,
      save: String,
    },

    tracklist: [
      {
        position: Number,
        title: String,
        duration: String,
      },
    ],

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

export const Album = mongoose.model<TAlbum>("Album", albumSchema);
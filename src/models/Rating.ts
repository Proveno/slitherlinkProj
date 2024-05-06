import mongoose, { Schema, models } from "mongoose";

const RatingSchema = new Schema(
  {
    player: {
      type: String,
      required: true,
      unique: true,
    },
    game: {
      type: String,
      required: true,
      unique: false,
    },
    rating: {
      type: Number,
      required: true,
      unique: false,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Rating = models.Rating || mongoose.model("Rating", RatingSchema);
export default Rating;

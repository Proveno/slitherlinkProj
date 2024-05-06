import mongoose, { Schema, models } from "mongoose";

const ScoreSchema = new Schema(
  {
    player: {
      type: String,
      required: true,
      unique: false,
    },
    game: {
      type: String,
      required: true,
      unique: false,
    },
    points: {
      type: Number,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Score = models.Score || mongoose.model("Score", ScoreSchema);
export default Score;

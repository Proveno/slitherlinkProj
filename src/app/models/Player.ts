import mongoose, { Schema, models } from "mongoose";

const PlayerSchema = new Schema(
  {
    avatar: {
      type: String,
      required: false,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Player = models.Player || mongoose.model("Player", PlayerSchema);
export default Player;

import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
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
    comment: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;

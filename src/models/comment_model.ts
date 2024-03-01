import { IComment } from "@src/types/schema";
import { Schema, model } from "mongoose";

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.ObjectId, ref: "Users" },
    post: {
      type: Schema.ObjectId,
      ref: "Posts",
    },
    text: { type: String },
    image: { type: String },
    sticker: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const Comment = model("Comments", commentSchema);

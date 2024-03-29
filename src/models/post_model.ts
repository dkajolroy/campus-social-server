import { UploadContent } from "@src/types/schema";
import { Schema, model } from "mongoose";

interface IPost {
  author: Object;
  type: "PROFILE" | "COVER" | "NORMAL";
  caption?: string;
  tags: Object[];
  reacts?: Object[];
  comments?: Object[];
  privacy: "ONLY_ME" | "FRIENDS" | "PUBLIC";
  media: UploadContent[];
}
const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.ObjectId, ref: "Users", required: true },
    type: {
      type: String,
      enum: ["PROFILE", "COVER", "NORMAL"],
      default: "NORMAL",
    },
    caption: { type: String, maxlength: 5000 },
    tags: [{ type: Schema.ObjectId, ref: "Users" }],
    reacts: [
      {
        type: Schema.ObjectId,
        ref: "Reacts",
      },
    ],
    comments: [
      {
        type: Schema.ObjectId,
        ref: "Comments",
      },
    ],
    privacy: {
      type: String,
      enum: ["ONLY_ME", "FRIENDS", "PUBLIC"],
      default: "PUBLIC",
    },
    media: [
      {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
        resource_type: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const Post = model("Posts", postSchema);

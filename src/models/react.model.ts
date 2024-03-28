import { Schema, model } from "mongoose";

enum RType {
  "LIKE" = "LIKE",
  "LOVE" = "LOVE",
  "HAHA" = "HAHA",
  "ANGRY" = "ANGRY",
  "WOW" = "WOW",
  "SAD" = "SAD",
  "CARE" = "CARE",
}
interface IReact {
  author: Object;
  type: RType;
  post: Object;
}

const reactSchema = new Schema<IReact>(
  {
    author: {
      type: Schema.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    post: {
      type: Schema.ObjectId,
      ref: "Posts",
    },
    type: {
      type: String,
      enum: RType,
      default: RType.LIKE,
    },
  },
  { timestamps: true, versionKey: false }
);
export const React = model("Reacts", reactSchema);

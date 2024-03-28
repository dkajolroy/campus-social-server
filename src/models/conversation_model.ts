import { Schema, model } from "mongoose";

interface Conversation {
  admin: Object[];
  isGroup: boolean;
  name: string;
  last_msg: Object;
  members: Object[];
  image: string;
}

const conversationSchema = new Schema<Conversation>(
  {
    name: { type: String, default: "Group" },
    image: { type: String },
    admin: [{ type: Schema.ObjectId, ref: "Users" }],
    members: [{ type: Schema.ObjectId, ref: "Users" }],
    last_msg: { type: Schema.ObjectId, ref: "Messages" },
    isGroup: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Conversation = model("Conversations", conversationSchema);

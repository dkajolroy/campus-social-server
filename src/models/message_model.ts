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

interface Message {
  sender: Object;
  receiver: Object;
  text: string;
  isRemoved: Boolean;
  react: {
    type: RType;
    reacted_by: Object;
  }[];
  delivered: boolean;
  seen: boolean;
  media: {
    public_id: { type: String; required: true };
    secure_url: { type: String; required: true };
    resource_type: { type: String; enum: ["image", "video"] };
  };
}

const messageSchema = new Schema<Message>(
  {
    sender: { type: Schema.ObjectId, ref: "Users", required: true },
    receiver: { type: Schema.ObjectId, ref: "Conversations", required: true },
    isRemoved: { type: Boolean, default: false },
    text: { type: String },
    media: [
      {
        public_id: { type: String },
        secure_url: { type: String },
        resource_type: { type: String },
      },
    ],
    delivered: { type: Boolean, default: false },
    seen: { type: Boolean, default: false },
    react: [
      {
        type: { type: String, enum: RType },
        reacted_by: { type: Schema.ObjectId, ref: "Users" },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const Message = model("Messages", messageSchema);

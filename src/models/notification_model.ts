import { Schema, model } from "mongoose";

interface Notification {
  sender: Object;
  receiver: Object[];
  text: string;
  read_by: Object[];
}

const notificationSchema = new Schema<Notification>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Users", required: true }, // Notification creator
    receiver: [{ type: Schema.Types.ObjectId, ref: "Users", required: true }], // Ids of the receivers of the notification
    text: { type: String },
    read_by: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true, versionKey: false }
);

export const Notification = model("Notifications", notificationSchema);

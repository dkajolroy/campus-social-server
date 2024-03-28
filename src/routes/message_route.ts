import { deliveryMsg } from "@src/controllers/message.controller/deliveryMsg.controller";
import { getMessages } from "@src/controllers/message.controller/get_message.controller";
import { sendMessageToUser } from "@src/controllers/message.controller/send_message.controller";
import { sendMessageToRoom } from "@src/controllers/message.controller/send_message_to_room";
import { Router } from "express";

export const MessageRoute = Router();

MessageRoute.route("/send").post(sendMessageToUser);
MessageRoute.route("/send/room").post(sendMessageToRoom);
MessageRoute.route("/delivery").post(deliveryMsg);
MessageRoute.route("/get/:conversation").get(getMessages);

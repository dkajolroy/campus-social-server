import { io } from "@src/index";
import { Conversation } from "@src/models/conversation_model";
import { Message } from "@src/models/message_model";
import { NextFunction, Request, Response } from "express";

export async function sendMessageToRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { author, receiver, text, media } = req.body;

    if (!receiver || (!text && !media))
      return res.status(400).send({ message: "Invalid message data !" });

    const message = await Message.create({
      sender: author,
      receiver,
      text,
    });
    await Conversation.findByIdAndUpdate(receiver, {
      $set: { last_msg: message._id },
    });
    io.to(receiver).emit("new_message");
    return res.status(200).send({ message: "Send message successfully !" });
  } catch (error) {
    next(error);
  }
}

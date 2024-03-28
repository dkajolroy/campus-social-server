import { Conversation } from "@src/models/conversation_model";
import { Message } from "@src/models/message_model";
import { NextFunction, Request, Response } from "express";

export async function sendMessageToUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { author, recipient, text, media } = req.body;
    if (!recipient || (!text && !media))
      return res.status(400).send({ message: "Invalid message data !" });

    // Media uploader
    // handle

    const existCon = await Conversation.findOne({
      members: [author, recipient],
    });
    if (existCon) {
      // exist conversation to send message
      const add_msg = await Message.create({
        text,
        sender: author,
        receiver: existCon._id,
        // add media
      });
      await existCon.updateOne({
        last_msg: add_msg._id,
      });
    } else {
      // new conversation to send message
      const newCon = await Conversation.create({
        members: [author, recipient],
        admin: author,
      });
      const message = await Message.create({
        text,
        sender: author,
        receiver: newCon._id,
        // add media
      });
      await newCon.updateOne({
        last_msg: message._id,
      });
    }

    res.status(200).send({ message: "Send message successfully !" });
  } catch (error) {
    next(error);
  }
}

import { Message } from "@src/models/message_model";
import { NextFunction, Request, Response } from "express";

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { conversation } = req.params;
    const limit = Number(req.params.limit || 20);
    if (!conversation)
      return res.status(400).send({ message: "Conversation not selected !" });

    const messages = await Message.find({
      receiver: conversation,
    })
      .populate("sender", "firstName lastName _id avatar username")
      .populate({
        path: "receiver",
        populate: {
          path: "members",
          select: "firstName lastName _id avatar username",
        },
      })
      .limit(limit);

    res.status(200).send(messages);
  } catch (error) {
    next(error);
  }
}

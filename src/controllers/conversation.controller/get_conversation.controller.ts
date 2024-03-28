import { Conversation } from "@src/models/conversation_model";
import { NextFunction, Request, Response } from "express";

export async function getConversations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = Number(req.query.limit || 20);
    const { author } = req.body;

    const conversations = await Conversation.find({
      members: { $in: author },
    })
      .populate("admin", "firstName lastName _id avatar username")
      .populate("members", "firstName lastName _id avatar username")
      .populate({
        path: "last_msg",
        populate: {
          path: "sender",
          select: "firstName lastName _id avatar username",
        },
      })
      .sort({ updatedAt: -1 })
      .limit(limit);
    res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
}

import { io } from "@src/index";
import { Message } from "@src/models/message_model";
import { NextFunction, Request, Response } from "express";

export async function deliveryMsg(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { author, messages } = req.body;

    await Message.find({
      _id: {
        $in: messages,
      },
      $nor: [{ sender: author }], // not update my msg to delivery
    }).updateMany({
      delivered: true,
    });
    io.emit("new_message");
    res.status(200).send({ message: "Successfully updated !" });
  } catch (error) {
    next(error);
  }
}

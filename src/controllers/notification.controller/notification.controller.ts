import { Notification } from "@src/models/notification_model";
import { NextFunction, Request, Response } from "express";

export async function get_notification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { author } = req.body;
    const notifications = await Notification.find({
      receiver: { $in: author },
    })
      .populate("receiver", "_id firstName lastName username avatar email")
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send(notifications);
  } catch (error) {
    next(error);
  }
}

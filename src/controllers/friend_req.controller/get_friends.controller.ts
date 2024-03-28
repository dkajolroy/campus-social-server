import { User } from "@src/models/user_model";
import { NextFunction, Request, Response } from "express";

export async function getFriends(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { author } = req.body;
  try {
    const friends = (
      await User.findById(author).populate(
        "friends.user",
        "_id firstName lastName avatar"
      )
    ).friends;
    res.status(200).send(friends);
  } catch (error) {
    next(error);
  }
}

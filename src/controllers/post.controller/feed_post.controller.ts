import { Post } from "@src/models/post_model";
import { User } from "@src/models/user_model";
import { NextFunction, Request, Response } from "express";

// Auto recommended feed posts
export default async function feedPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { author } = req.body;
    const limit = Number(req.query.limit || 20);

    // get post
    // randomly
    // pagination
    const user = await User.findById(author);
    const post = await Post.find({
      author: { $in: [...user.friends, ...user.requestTo, author] },
    })
      .populate("author", "avatar _id firstName lastName username")
      .limit(limit);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
}

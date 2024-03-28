import { io } from "@src/index";
import { Notification } from "@src/models/notification_model";
import { Post } from "@src/models/post_model";
import { React } from "@src/models/react.model";
import { NextFunction, Request, Response } from "express";

export default async function react(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { author, type } = req.body;
    const { postId } = req.params;
    if (!postId || !author || !type)
      res.status(400).send({ message: "Invalid reaction data" });

    // author | post | already reaction
    const already = await React.findOne({
      author,
      post: postId,
    });
    if (already) {
      if (already.type === type) {
        // remove reaction
        await React.findByIdAndDelete(already._id);
        await Post.findByIdAndUpdate(postId, {
          $pull: { reacts: already._id },
        });
      } else {
        // update reaction
        await React.findByIdAndUpdate(already._id, {
          $set: {
            type,
          },
        });
      }
    } else {
      // New Reaction
      const react = await React.create({
        author,
        post: postId,
        type,
      });
      const post = await Post.findByIdAndUpdate(postId, {
        $push: { reacts: react._id },
      });
      // notification to post author
      const notification = await Notification.create({
        sender: author,
        receiver: [post.author],
        text: "React to your post !",
      });
      io.emit("notification", notification);
    }

    return res.status(200).send({ message: "Reaction done !" });
  } catch (error) {
    next(error);
  }
}

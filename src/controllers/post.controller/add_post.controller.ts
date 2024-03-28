import { server_config } from "@src/config/server_config";
import { Post } from "@src/models/post_model";
import { decodeToken } from "@src/utils/generate";
import { UploadApiResponse } from "cloudinary";
import { NextFunction, Request, Response } from "express";

interface UploadRes {
  files?: UploadApiResponse[];
  caption?: string;
  author: string;
  privacy: "ONLY_ME" | "FRIENDS" | "PUBLIC";
  type: "PROFILE" | "COVER" | "NORMAL";
}
// Add new Post
export default async function addPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = decodeToken(req.cookies[server_config.authCookieName]); // return user:id
    const { files, caption, privacy, type }: UploadRes = req.body;
    if (!user || (!files.length && !caption)) {
      res.status(400).send({ message: "Invalid post data request ! " });
    }
    const post = await Post.create({
      caption,
      author: user,
      privacy,
      type,
      media: files,
    });

    res.status(200).send({ post, message: "Post created successfully !" });
    //create new post
  } catch (error) {
    next(error);
  }
}

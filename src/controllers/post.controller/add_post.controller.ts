import { serverConfig } from "@src/config/server_config";
import { Post } from "@src/models/post_model";
import { decodeToken } from "@src/utils/generate";
import { UploadApiResponse } from "cloudinary";
import { NextFunction, Request, Response } from "express";

interface UploadRes {
  images?: UploadApiResponse[];
  videos?: UploadApiResponse[];
  text?: string;
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
    const { user } = decodeToken(req.cookies[serverConfig.authCookieName]); // return user:id
    const { videos, images, text, privacy, type }: UploadRes = req.body;
    if (!user || (!images.length && !videos.length && !text)) {
      res.status(400).send({ message: "Invalid post data request ! " });
    }
    const videoList = videos.map((x) => {
      return { secure_url: x.secure_url, public_id: x.public_id };
    });
    const imageList = images.map((x) => {
      return { secure_url: x.secure_url, public_id: x.public_id };
    });
    const post = await Post.create({
      text,
      author: user,
      privacy,
      type,
      images: imageList,
      videos: videoList,
    });

    res.status(200).send({ post, message: "Post created successfully !" });
    //create new post
  } catch (error) {
    next(error);
  }
}

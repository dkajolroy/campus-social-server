import { NextFunction, Request, Response } from "express";

// Auto recommended feed posts
export default function feedPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // delete all images
    // delete reacts
    // delete comments
    // delete post
  } catch (error) {
    next(error);
  }
}

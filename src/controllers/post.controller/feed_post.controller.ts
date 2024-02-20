import { NextFunction, Request, Response } from "express";

// Auto recommended feed posts
export default function feedPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get post
    // randomly
    // pagination
  } catch (error) {
    next(error);
  }
}

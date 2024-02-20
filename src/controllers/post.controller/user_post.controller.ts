import { NextFunction, Request, Response } from "express";

// view user profile her post
export default function userPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get post
    // randomly
  } catch (error) {
    next(error);
  }
}

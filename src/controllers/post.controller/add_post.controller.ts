import { NextFunction, Request, Response } from "express";

// Add new Post
export default function addPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //create new post
  } catch (error) {
    next(error);
  }
}

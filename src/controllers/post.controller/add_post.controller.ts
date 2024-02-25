import { NextFunction, Request, Response } from "express";

// Add new Post
export default function addPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    //create new post
  } catch (error) {
    next(error);
  }
}

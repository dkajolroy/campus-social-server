import { NextFunction, Request, Response } from "express";

export default async function react(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // authenticate
    // new react
    // update react
  } catch (error) {
    next(error);
  }
}

import { NextFunction, Request, Response } from "express";

export default function verifySendAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // login email to send link
  } catch (error) {
    next(error);
  }
}

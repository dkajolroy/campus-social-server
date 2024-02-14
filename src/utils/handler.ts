import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
}

// generate token
export function generateToken(userId: string) {
  return Jwt.sign({ userId }, process.env.SECRETE_KEY, {
    expiresIn: "30d",
  });
}

import { NextFunction, Request, Response } from "express";

// error handler
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (err.message.startsWith("E11000")) {
      // duplicate unique data
      return res.status(400).send({ message: "User already exist !" });
    }
    if (err.name === "ValidationError")
      return res // mongoose validator min/max etc
        .status(400)
        .send({ message: "Please enter your valid details !" });
    if (err.name === "TokenExpiredError")
      return res // mongoose validator min/max etc
        .status(400)
        .send({ message: "Expired your time or login session !" });
    return res.status(400).send({ message: "Something want wrong !" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
}

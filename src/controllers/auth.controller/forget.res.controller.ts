import { NextFunction, Request, Response } from "express";

export default function forgetResAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const input: { password?: string } = req.body;
  if (!input.password)
    res.status(400).send({ message: "Invalid forget request !" });
  try {
    // validate token | otp to change password
    // otp time is updatedAt to 10min
  } catch (error) {
    next(error);
  }
}

import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  try {
    const decode = Jwt.verify(token, process.env.SECRETE_KEY);
    // set data to body
    next();
  } catch (error) {
    if (!token) {
      res
        .send({ message: "You are not authenticate, please login !" })
        .redirect("/auth/sign-in"); // Token not found
    } else {
      res
        .send({ message: "Login expire or Wrong way to try ! please login" })
        .redirect("/auth/sign-in"); // Expire or wrong token
    }
  }
};

import { User } from "@src/models/user_model";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { InputSignIn } from "../../types/input";
import { generateToken } from "../../utils/generate";
import { sendClientCookie, sendServerCookie } from "../../utils/send_cookie";

// For Login
export default async function signInAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check input form data
  const input: InputSignIn = req.body;
  if (!input.email || !input.password)
    return res.status(400).send({ message: "Invalid form data !" });
  try {
    // find and validate user
    const user = await User.findOne({
      email: input.email.trim().toLowerCase(),
    });
    if (!user) return res.status(400).send({ message: "User not found !" });
    if (!(await bcrypt.compare(input.password, user.password)))
      return res.status(400).send({ message: "Password is incorrect !" });

    // extract data
    const { password, onetimeKey, ...other } = user._doc;
    const token = generateToken(user._id); // for server only private route
    const value = generateToken(user.email); // for access from client

    // successfully login
    sendServerCookie(res, { token }); // for server only private route
    sendClientCookie(res, { value }); // for access from client

    return res.status(200).send({
      user: other,
      token,
      message: "Sign in successfully !",
    });
  } catch (error) {
    next(error);
  }
}

import { User } from "@src/models/user_model";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export default async function forgetSuccessAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const input: {
    password?: string;
    key?: string;
    otp?: number;
    email?: string;
  } = req.body;
  if (!input.password || (!input.key && (!input.otp || !input.email)))
    res.status(400).send({ message: "Invalid forget request !" });
  try {
    // token expire
    // otp === otp
    const password = bcrypt.hashSync(input.password, 10);
    if (input.key) {
      const decode = Jwt.verify(input.key, process.env.SECRETE_KEY) as {
        user: string;
      };
      await User.findOneAndUpdate(
        { email: decode.user },
        {
          $set: { password },
        },
        { new: true }
      );
    } else {
      await User.findOneAndUpdate(
        { email: input.email.trim().toLowerCase() },
        {
          $set: { password },
        },
        { new: true }
      );
    }
    return res.status(200).send({
      message: "Password forget successfully please login !",
    });
  } catch (error) {
    next(error);
  }
}

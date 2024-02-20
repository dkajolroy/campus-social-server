import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { userModel } from "../../models/user_model";
import { generateToken } from "../../utils/generate";

// For verification email
export default async function verifyDoneAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const key = req.params.key;
    if (!key)
      return res
        .status(400)
        .send({ message: "Invalid verification request !" });

    const decode = Jwt.verify(key, process.env.SECRETE_KEY) as {
      userId: string;
    }; // solution res types
    const user = await userModel.findByIdAndUpdate(
      decode.userId,
      {
        $set: {
          verifiedEmail: true,
        },
      },
      { new: true }
    );

    if (!user) return res.status(400).send({ message: "User not found !" });
    // extract data
    const { password, onetimeKey, ...other } = user._doc;
    const token = generateToken(user._id);

    // successfully login
    return res.status(200).send({
      user: other,
      token,
      message: "Verification successfully !",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

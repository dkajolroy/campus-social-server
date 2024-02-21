import { NextFunction, Request, Response } from "express";
import { sendMail } from "../../email/config_mail";
import { forgetPassMail } from "../../email/forget_password";
import { userModel } from "../../models/user_model";
import { generateOTP, generateToken } from "../../utils/generate";

// For forget password
export default async function forgetReqAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // input form data
    const input: { email?: string } = req.body;
    if (!input.email)
      return res
        .status(400)
        .send({ message: "Invalid forget password request !" });

    // find - check and update user
    const otp = generateOTP();
    const user = await userModel.findOneAndUpdate(
      { email: input.email.trim().toLowerCase() },
      {
        $set: { onetimeKey: otp },
      },
      { new: true }
    );
    if (!user) return res.status(400).send({ message: "User not found !" });

    const onetimeUrl = generateToken(user.email, "10m");
    const html = forgetPassMail({
      name: `${user.firstName} ${user.lastName || ""}`,
      otp,
      token: onetimeUrl,
    });
    sendMail({
      to: user.email,
      subject: "Forget password",
      text: "Your Forget mail hare",
      html,
    });
    const token = generateToken(user._id);
    // successfully login
    return res.status(200).send({
      token,
      otp,
      message: "Send OTP ! check your inbox !",
    });
  } catch (error) {
    next(error);
  }
}

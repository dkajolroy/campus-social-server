import { NextFunction, Request, Response } from "express";
import { sendMail } from "../../email/config_mail";
import { forgetPassMail } from "../../email/forget_password";
import { userModel } from "../../models/user_model";
import { generateToken } from "../../utils/generate";

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
    const otp = (Math.random() * 9000).toString().split(".")[0];
    const user = await userModel.findOneAndUpdate(
      { email: input.email.trim().toLowerCase() },
      {
        $set: { onetimeKey: otp },
      },
      { new: true }
    );
    if (!user) return res.status(400).send({ message: "User not found !" });

    // generate token
    const onetimeUrl = generateToken(user.email, "10m");
    const verificationUrl = `https://${process.env.FRONTEND_URL}/auth/forget-pass/${onetimeUrl}`;
    // send mail
    const html = forgetPassMail(); // send link and otp
    sendMail({
      toEmail: input.email,
      html,
      subject: "Forget password",
      text: "Forget password !",
    });

    // extract data
    const { password, onetimeKey, ...other } = user._doc;
    const token = generateToken(user._id);
    // successfully login
    return res.status(200).send({
      user: other,
      token,
      message: "Forget account process !",
    });
  } catch (error) {
    next(error);
  }
}

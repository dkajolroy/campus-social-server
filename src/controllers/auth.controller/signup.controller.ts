import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { serverConfig } from "../../config/server_config";
import { sendMail } from "../../email/config_mail";
import { welcomeMail } from "../../email/welcome";
import { userModel } from "../../models/user_model";
import { InputSignUp } from "../../types/input";
import { generateToken, generateUsername } from "../../utils/generate";
import { sendClientCookie, sendServerCookie } from "../../utils/send_cookie";

// For Sign Up
export default async function signupAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // check input form data
  const input: InputSignUp = req.body;
  if (
    !input.firstName ||
    !input.email ||
    !input.password ||
    input.password.trim().length < 4
  )
    return res.status(400).send({ message: "Invalid form data !" });
  try {
    //email validator
    const validEmail = validator.isEmail(input.email.trim().toLowerCase());
    if (!validEmail)
      return res.status(400).send({ message: "Invalid your email !" });

    // encrypt password and generate username
    const encrypt = bcrypt.hashSync(input.password.trim(), 10);
    const username = generateUsername(input.firstName, input.lastName);
    // create user
    const user = await userModel.create({
      firstName: input.firstName,
      lastName: input.lastName,
      password: encrypt,
      username,
      email: input.email.trim().toLowerCase(),
    });

    // send mail
    const html = welcomeMail({
      name: `${input.firstName} ${input.lastName || ""}`,
    });
    sendMail({
      toEmail: input.email.trim().toLowerCase(),
      html,
      subject: "Welcome to " + serverConfig.appName,
      text: "New account welcome message for you !",
    });

    // extract data
    const { password, onetimeKey, ...other } = user._doc;
    const token = generateToken(user._id); // for server only private route
    const value = generateToken(user.firstName); // for access from client

    // successfully login
    sendServerCookie(res, { token }); // for server only private route
    sendClientCookie(res, { value }); // for access from client
    return res.status(200).send({
      user: other,
      token,
      message: "Sign up successfully !",
    });
  } catch (error) {
    // duplicate key or any error
    next(error);
  }
}

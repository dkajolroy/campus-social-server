import nodemailer, { SendMailOptions } from "nodemailer";
import { server_config } from "../config/server_config";

export function sendMail(mailOption: SendMailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_KEY,
    },
  });
  transporter.sendMail(
    {
      from: {
        name: server_config.appName,
        address: process.env.NODEMAILER_EMAIL,
      },
      ...mailOption,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.accepted);
      }
    }
  );
}

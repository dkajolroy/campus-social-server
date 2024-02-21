import nodemailer, { SendMailOptions } from "nodemailer";
import { serverConfig } from "../config/server_config";
interface SendProp {
  toEmail: string;
  html: string;
  subject: string;
  text: string;
}
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
        name: serverConfig.appName,
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

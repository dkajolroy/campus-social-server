import sgMail from "@sendgrid/mail";
import { serverConfig } from "../config/server_config";

interface SendProp {
  toEmail: string;
  html: string;
  subject: string;
  text: string;
}

// Send mail config
export function sendMail({ toEmail, html, subject, text }: SendProp) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY); // setup api
  const msg = {
    from: {
      name: serverConfig.appName, // Mail Title Name
      email: process.env.SENDGRID_FROM_EMAIL,
    }, // Change to your verified sender
    to: toEmail.trim().toLocaleLowerCase(), // Change to your recipient
    subject, // Heading Message
    text, // Optional
    html, // Template
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("W-Send to => " + toEmail);
    })
    .catch((error) => {
      console.log("welcome message error : user mail=> " + toEmail);
    });
}

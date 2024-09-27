import nodemailer from "nodemailer";
import configs from "../configs";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: configs.NODE_ENV === "production", // Use `true` for port 465, `false` for all other ports
  auth: {
    user: configs.adminEmail,
    pass: configs.smtpPassword,
  },
});

type TContact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export const sendContactEmail = async (emailData: TContact) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: configs.adminEmail,
    to: emailData.email, // list of receivers
    subject: emailData.subject, // Subject line
    text: emailData.message, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  return info.response;
};

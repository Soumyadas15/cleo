import nodemailer from "nodemailer";
import fs from "fs/promises";


/**
 * Sends an email using the provided email address.
 * @param email the email address to send the email to
*/


const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendEmail = async (
    email: string, 
  ) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PIN,
    },
  });
  

  const htmlTemplate = await fs.readFile("email-template.html", "utf8");
  
  
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Welcome",
    html: htmlTemplate,
  };
  
  await transporter.sendMail(mailOptions);
}
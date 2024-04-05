import nodemailer from "nodemailer";
import { format } from 'date-fns';


export const sendPasswordMail = async (
    email: string,
    body: string,
    role: string,
) => { 

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PIN,
        },
    });


    const emailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login credentials </title>
        </head>
        <body>
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px;">
                <h1 style="font-size: 1.875rem; font-weight: bold; color: #fff;">Hello</h1>
                <p>Hello there!</p>
                
                <p>You are added as a ${role} on our customer succes platform. Your login credentials are listed here:</p>
                <div style="background-color: #fff; padding: 15px; border-radius: 5px;">
                    Email: ${email}
                </div>
                <p>Password: ${body}</p>

                <p>Please not that you can also login with your microsoft account associated with the same email ID without the need of a password.</p>

                <p>Thanks and regards</p>
                <p>Promact Infotech Pvt Ltd.</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Promact - Customer Success | Login credentials",
        html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
}

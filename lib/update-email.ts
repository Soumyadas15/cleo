import nodemailer from "nodemailer";
import { Project } from "@prisma/client";


export const sendUpdateEmail = async (
    email: string,
    name: string,
    projectId: string,
    projectName: string,
) => { 

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PIN,
        },
    });

    const projectLink = `${process.env.AUTH0_BASE_URL}/main/projects/${projectId}`;

    const emailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Project update | Promact Infotech</title>
        </head>
        <body>
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px;">
                <h1 style="font-size: 1.875rem; font-weight: bold; color: #fff;">Hello ${name}</h1>
                <p>Hello there!</p>
                <p>Please note that the ${projectName} project has been update. Please visit this <a href="${projectLink}">link</a> to view the recent changes.</p>
                
                <p>Thanks and regards</p>
                <p>Promact Infotech Pvt Ltd.</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Project Update",
        html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
}

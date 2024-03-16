import nodemailer from "nodemailer";
import { Audit, Project } from "@prisma/client";
import { format } from 'date-fns';

/**
 * Sends an email using the provided email address.
 * @param email the email address to send the email to
 * @param auditDetails the details of the newly created audit
 * @param clientName the name of the client
 */

export const sendEmail = async (
    email: string,
    audit: Audit,
    clientName: string,
    project: Project,
    auditAction: string
) => { 

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PIN,
        },
    });

    const dynamicContent = `
        <p>Date: ${format(new Date(audit.date), "MM dd yyyy")}</p>
        <p>Comments: ${audit.comments}</p>
        <p>Reviewed By: ${audit.reviewedBy}</p>
        <p>Reviewed Section: ${audit.reviewedSection}</p>
        <p>Status: ${audit.status}</p>
        <p>Action Items: ${audit.actionItem}</p>
    `;

    const auditLink = `http://localhost:3000/main/projects/${project.id}/audits`;

    const emailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Audit update | Promact Infotech</title>
        </head>
        <body>
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 5px;">
                <h1 style="font-size: 1.875rem; font-weight: bold; color: #fff;">Hello ${clientName}</h1>
                <p>Hello there!</p>
                <p>Please note that ${auditAction}</p>

                <div style="background-color: #fff; padding: 15px; border-radius: 5px;">
                    ${dynamicContent}
                </div>

                <p>Link: ${auditLink}</p>

                <p>Thanks and regards</p>
                <p>Promact Infotech Pvt Ltd.</p>
            </div>
        </body>
        </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Audit Update",
        html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
}

// Change your mail.ts file

import nodemailer from "nodemailer";
import fs from "fs/promises";
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

    const htmlTemplate = await fs.readFile("email-template.html", "utf8");

    const dynamicContent = `
        <p>Date: ${format(new Date(audit.date), "MM dd yyyy")}</p>
        <p>Comments: ${audit.comments}</p>
        <p>Reviewed By: ${audit.reviewedBy}</p>
        <p>Reviewed Section: ${audit.reviewedSection}</p>
        <p>Status: ${audit.status}</p>
        <p>Action Items: ${audit.actionItem}</p>
    `;

    const auditLink = `http://localhost:3000/main/projects/${project.id}/audits`

    const dynamicTemplate = htmlTemplate
        .replace("[auditAction]", auditAction)
        .replace("[Stakeholder Name]", clientName)
        .replace("[Audit Details]", dynamicContent)
        .replace("[Link]", auditLink);

    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Audit Update",
        html: dynamicTemplate,
    };

    await transporter.sendMail(mailOptions);
}

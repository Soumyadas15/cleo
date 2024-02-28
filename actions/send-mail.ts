"use server";

import { sendEmail } from "@/lib/mail";

export const mail = async (values: any) => {
    const email = values;

    if (!email) return { error: "Invalid emaiL!" };

    await sendEmail(email);

    return { success: "Email succesfully sent" }
}
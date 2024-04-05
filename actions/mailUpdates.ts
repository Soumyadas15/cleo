"use server"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import getMembersByProjectId from "./getMembers/getMembersByProjectId";
import { sendUpdateEmail } from "@/lib/update-email";

export async function mailUpdates (projectName: string, projectId: string) {
    try {
        const user = await initialProfile();

        if (!user){
            return new Response('User not found', { status: 404 }); 
        }

        const members = await getMembersByProjectId(projectId);

        //@ts-ignore
        for (const member of members) {
            await sendUpdateEmail(
                member.user.email,
                member.user.name,
                projectId,
                projectName,
            )
        }
    
    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
      }
}
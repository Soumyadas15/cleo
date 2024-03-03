"use server"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

export default async function getUpdates(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId } = params; 

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const updates = await db.update.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                date: 'desc'
            }
        });

        return updates;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

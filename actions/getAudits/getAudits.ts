"use server"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

export default async function getAudits(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId } = params; 

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const audits = await db.audit.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                date: 'desc'
            }
        });

        return audits;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

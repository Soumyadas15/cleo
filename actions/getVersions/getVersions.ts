"use server"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

export default async function getVersions(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId } = params; 

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const versions = await db.version.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return versions;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

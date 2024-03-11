"use server"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

export default async function getTeams(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId } = params; 

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const teams = await db.team.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return teams;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

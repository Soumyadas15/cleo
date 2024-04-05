"use server"

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

export default async function getFlows(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId } = params; 

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const workflows = await db.workflow.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        console.log(workflows)

        return workflows;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
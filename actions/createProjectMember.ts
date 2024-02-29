"use server"

import { db } from '@/lib/db';
import getUserByEmail from './getUsers/getUserByEmail';

export default async function createProjectMember(email: string, createdBy: string, projectId: string, role: string) {
    try {
        
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        const projectMember = await db.member.create({
            
            data: {
                //@ts-ignore
                role: role,
                userId: user.id,
                projectId: projectId,
            },
        });

        return projectMember;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
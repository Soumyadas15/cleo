import { db } from '@/lib/db';
import { Project, User } from '@prisma/client';

interface IParams {
    projectId?: string;
}

export default async function getProjectById(params: IParams) {
    try {
        const { projectId } = params;
        
        if (!projectId) {
            return null;
        }

        const project = await db.project.findUnique({
            where: {
                id: projectId
            },
        });

        if (!project) {
            return null;
        }

        return project;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
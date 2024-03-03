import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { PrismaClient } from '@prisma/client';

interface IParams {
    phaseId?: string;
}

export default async function getProjectByPhaseId(params: IParams) {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        const { phaseId } = params;

        if (!phaseId) {
            throw new Error('Audit ID is required');
        }

        const phase = await db.phase.findUnique({
            where: {
                id: phaseId,
            },
            include: {
                project: true,
            },
        });

        if (!phase) {
            throw new Error('Audit not found');
        }

        return phase.project;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

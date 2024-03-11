import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { PrismaClient } from '@prisma/client';

interface IParams {
    teamId?: string;
}

export default async function getProjectByTeamId(params: IParams) {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        const { teamId } = params;

        if (!teamId) {
            throw new Error('Team ID is required');
        }

        const team = await db.team.findUnique({
            where: {
                id: teamId,
            },
            include: {
                project: true,
            },
        });

        if (!team) {
            throw new Error('Team not found');
        }

        return team.project;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

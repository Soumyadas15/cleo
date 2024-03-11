"use server"

import { db } from '@/lib/db';

interface IParams {
    teamId?: string;
}

export default async function getTeamById(params: IParams) {
    try {
        const { teamId } = params;

        const team = await db.team.findUnique({
            where: {
                id: teamId
            }
        })
        if (!team) {
            return null;
        }

        return team;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
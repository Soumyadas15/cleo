"use server"

import { db } from '@/lib/db';

interface IParams {
    teamId?: string;
}

export default async function getTeamContentByTeamId(params: IParams) {
    try {
        const { teamId } = params;

        const teamContents = await db.team_content.findMany({
            where: {
                teamId: teamId
            }
        })
        if (!teamContents) {
            return null;
        }

        return teamContents;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
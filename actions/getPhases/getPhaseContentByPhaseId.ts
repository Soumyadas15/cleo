"use server"

import { db } from '@/lib/db';

interface IParams {
    phaseId?: string;
}

export default async function getPhaseContentByPhaseIds(params: IParams) {
    try {
        const { phaseId } = params;

        const phaseContents = await db.phase_content.findMany({
            where: {
                phaseId: phaseId
            }
        })
        if (!phaseContents) {
            return null;
        }

        return phaseContents;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
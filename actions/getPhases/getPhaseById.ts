"use server"

import { db } from '@/lib/db';

interface IParams {
    phaseId?: string;
}

export default async function getPhaseById(params: IParams) {
    try {
        const { phaseId } = params;

        const phase = await db.phase.findUnique({
            where: {
                id: phaseId
            }
        })
        if (!phase) {
            return null;
        }

        return phase;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
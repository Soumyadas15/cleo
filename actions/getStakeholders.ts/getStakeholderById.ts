"use server"

import { db } from '@/lib/db';

interface IParams {
    stakeholderId?: string;
}

export default async function getStakeholderById(params: IParams) {
    try {
        const { stakeholderId } = params;

        const stakeholder = await db.stakeholder.findUnique({
            where: {
                id: stakeholderId
            }
        })
        if (!stakeholder) {
            return null;
        }

        return stakeholder;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
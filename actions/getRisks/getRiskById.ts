"use server"

import { db } from '@/lib/db';

interface IParams {
    riskId?: string;
}

export default async function getRiskById(params: IParams) {
    try {
        const { riskId } = params;

        const risk = await db.risk.findUnique({
            where: {
                id: riskId
            }
        })
        if (!risk) {
            return null;
        }

        return risk;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
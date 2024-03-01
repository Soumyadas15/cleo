"use server"

import { db } from '@/lib/db';

interface IParams {
    auditId?: string;
}

export default async function getAuditById(params: IParams) {
    try {
        const { auditId } = params;

        const audit = await db.audit.findUnique({
            where: {
                id: auditId
            }
        })
        if (!audit) {
            return null;
        }

        return audit;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
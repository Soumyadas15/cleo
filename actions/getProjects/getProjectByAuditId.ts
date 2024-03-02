import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { PrismaClient } from '@prisma/client';

interface IParams {
    auditId?: string;
}

export default async function getProjectByAuditId(params: IParams) {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        const { auditId } = params;

        if (!auditId) {
            throw new Error('Audit ID is required');
        }

        const audit = await db.audit.findUnique({
            where: {
                id: auditId,
            },
            include: {
                project: true,
            },
        });

        if (!audit) {
            throw new Error('Audit not found');
        }

        return audit.project;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

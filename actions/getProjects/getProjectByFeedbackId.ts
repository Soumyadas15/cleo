import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { PrismaClient } from '@prisma/client';


interface IParams {
    feedbackId?: string;
}

export default async function getProjectByFeedbackId(params: IParams) {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        const { feedbackId } = params;

        if (!feedbackId) {
            throw new Error('Feedback ID is required');
        }

        const feedback = await db.feedback.findUnique({
            where: {
                id: feedbackId,
            },
            include: {
                project: true,
            },
        });

        if (!feedback) {
            throw new Error('Feedback not found');
        }

        return feedback.project;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

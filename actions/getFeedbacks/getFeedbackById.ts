"use server"

import { db } from '@/lib/db';

interface IParams {
    feedbackId?: string;
}

export default async function getFeedbackById(params: IParams) {
    try {
        const { feedbackId } = params;

        const feedback = await db.feedback.findUnique({
            where: {
                id: feedbackId
            }
        })
        if (!feedback) {
            return null;
        }

        return feedback;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
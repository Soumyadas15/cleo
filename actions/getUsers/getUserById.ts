"use server"

import { db } from '@/lib/db';

interface IParams {
    userId?: string;
}

export default async function getUserById(params: IParams) {
    try {
        const { userId } = params;

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            return null;
        }

        return {
            ...user,
            name: user.name,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
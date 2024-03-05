"use server"

import { db } from '@/lib/db';

export default async function getUserByEmail(email: string) {
    try {

        const user = await db.user.findFirst({
            //@ts-ignore
            where: {
                email: email,
            },
        });
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
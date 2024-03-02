"use server"

import { db } from '@/lib/db';

interface IParams {
    resourceId?: string;
}

export default async function getResourceById(params: IParams) {
    try {
        const { resourceId } = params;

        const resource = await db.resource.findUnique({
            where: {
                id: resourceId
            }
        })
        if (!resource) {
            return null;
        }

        return resource;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
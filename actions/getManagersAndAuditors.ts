"use server"

import { db } from '@/lib/db';
import getUserByEmail from './getUsers/getUserByEmail';
import { initialProfile } from '@/lib/initial-profile';

export default async function getManagersAndAuditors() {
    try {
        
        const user = await initialProfile();
        
        const managersAndAuditors = await db.user.findMany({
            where: {
                role: "MANAGER" || "AUDITOR",
            }
        })

        return managersAndAuditors;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
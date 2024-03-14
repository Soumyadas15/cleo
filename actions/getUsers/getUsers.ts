"use server"

import { db } from '@/lib/db';

export default async function getUsers() {
    try {

        const managers = await db.user.count({
            where: {
                role: "MANAGER"
            }
        })

        const auditors = await db.user.count({
            where: {
                role: "AUDITOR"
            }
        })

        const clients = await db.user.count({
            where: {
                role: "CLIENT"
            }
        })
        

        return { managers : managers, 
                auditors : auditors, 
                clients : clients
            };

            
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
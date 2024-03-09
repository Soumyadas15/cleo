import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'; 
import getUserById from '../getUsers/getUserById';

export default async function getNotifications() {
    try {
        const user = await initialProfile();

        if (!user) {
            throw new Error('No user found');
        }

        const notifications = await db.notification.findMany({
            where: {
                userId: user.id,
            }
        })

        return notifications;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'; 
import getUserById from '../getUsers/getUserById';

export default async function getUnreadNotifications() {
    try {
        const user = await initialProfile();

        if (!user) {
            throw new Error('No user found');
        }

        const unreadCount = await db.notification.count({
            where: {
                //@ts-ignore
                userId: user.id,
                isRead: false,
            }
        })

        return unreadCount;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

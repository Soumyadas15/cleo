import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'; // Adjust the import statement to match the correct path
import getUserById from '../getUsers/getUserById';

export default async function getProjectsByUsertId() {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        let projects;
        
        if (user.role === 'ADMIN') {
            projects = await db.project.findMany({
                where: {
                    userId: user.id
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } 
        else if (user.role === 'MANAGER') {
            projects = await db.project.findMany({
                where: {
                    projectManagerId: user.id
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } 
        else if (user.role === 'AUDITOR') {
            projects = await db.project.findMany({
                where: {
                    auditorId: user.id
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } 
        else if (user.role === 'CLIENT') {
            projects = await db.project.findMany({
                where: {
                    clientId: user.id
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }

        return projects
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
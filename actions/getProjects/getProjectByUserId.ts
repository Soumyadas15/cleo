"use server"


/**
 * Returns a list of projects for the currently authenticated user.
 *
 * @returns {Project[]} an array of projects
*/

import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';


export default async function getProjects() {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        let projects;

        if (user.role === 'ADMIN') {
            // Fetch all projects created by the admin user
            projects = await db.project.findMany({
                where: {
                    userId: user.id
                }
            });
        } else if (user.role === 'MANAGER') {
            // Fetch projects where the user is a project manager
            projects = await db.project.findMany({
                where: {
                    projectManagerId: user.id
                }
            });
        } else if (user.role === 'AUDITOR') {
            // Fetch projects where the user is an auditor
            projects = await db.project.findMany({
                where: {
                    auditorId: user.id
                }
            });
        }

        return projects;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
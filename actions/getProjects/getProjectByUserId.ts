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

        const projects = await db.project.findMany({
            where: {
                userId: user.id
            }
        })

        return projects
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
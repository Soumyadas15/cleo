import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'; // Adjust the import statement to match the correct path
import getUserById from '../getUsers/getUserById';

export default async function getProjectsWithNames() {
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
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } else if (user.role === 'MANAGER') {
            // Fetch projects where the user is a project manager
            projects = await db.project.findMany({
                where: {
                    projectManagerId: user.id
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } else if (user.role === 'AUDITOR') {
            // Fetch projects where the user is an auditor
            projects = await db.project.findMany({
                where: {
                    auditorId: user.id
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }

        // Iterate through each project to get user and auditor names
        // const projectsWithNames = await Promise.all(projects.map(async (project) => {
        //     const manager = await getUserById({ userId: project.projectManagerId! });
        //     const auditor = await getUserById({ userId: project.auditorId! });

        //     return {
        //         id: project.id,
        //         name: project.name,
        //         userId: project.userId,
        //         auditorId: project.auditorId,
        //         auditorName: auditor ? auditor.name : null,
        //         managerId: project.projectManagerId,
        //         managerName: manager ? manager.name : null,
        //         createdAt: project.createdAt.toISOString(),
        //         updatedAt: project.updatedAt.toISOString(),
        //     };
        // }));

        return projects
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

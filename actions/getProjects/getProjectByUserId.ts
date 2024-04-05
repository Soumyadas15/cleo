import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { Member, Project } from '@prisma/client';

export default async function getProjectsByUserId(): Promise<Project[]> {
    try {
        const user = await initialProfile();

        if (!user) {
            return [];
        }

        let projects: Project[] = [];

        // Fetch all the memberships associated with the user
        const userMemberships: Member[] = await db.member.findMany({
            where: {
                userId: user.id
            },
            include: {
                project: true
            }
        });

        if (userMemberships.length === 0) {
            return [];
        }

        userMemberships.forEach((member: Member) => {
            //@ts-ignore
            projects.push(member.project);
        });

        projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return projects;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

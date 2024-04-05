"use server"

//@ts-ignore
import { db } from "@/lib/db";
//@ts-ignore
import { initialProfile } from "@/lib/initial-profile";

export default async function getMembersByProjectId(projectId: string){
    try{
        const currentUser = await initialProfile()

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const members = await db.member.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        imageUrl: true,
                        email: true,
                        name: true,
                    }
                }
            }
        });

        const projectMembers = members.map(member => ({
            ...member,
            profilePic: member.user?.imageUrl,
            email: member.user?.email,
            name: member.user?.name,
        }));

        return projectMembers;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

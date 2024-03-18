"use server"

//@ts-ignore
import { db } from "@/lib/db";
//@ts-ignore
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

export default async function getMembers(params: IParams){
    try{
        const currentUser = await initialProfile()
        const { projectId } = params; 

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
                        imageUrl: true
                    }
                }
            }
        });

        const membersWithImageUrl = members.map(member => ({
            ...member,
            profilePic: member.user?.imageUrl
        }));

        return membersWithImageUrl;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

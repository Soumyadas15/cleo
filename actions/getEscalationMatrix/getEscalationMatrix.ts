import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
    type?: string;
}

export default async function getEscalationMatrix(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId, type } = params;

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        let whereClause: any = { projectId: projectId };

        if (type) {
            whereClause.type = type;
        }

        const escalationMatrix = await db.escalation_matrix.findMany({
            where: whereClause,
            orderBy: {
                level: 'asc'
            }
        });

        return escalationMatrix;

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

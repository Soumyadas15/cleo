import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { subWeeks, startOfWeek, endOfWeek } from "date-fns";

interface IParams {
    projectId?: string;
}

export default async function getTotalTeams(params: IParams){
    try{
        const currentUser = await initialProfile();
        const { projectId } = params; 

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }


        const currentDate = new Date();

 
        const startDateCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); 
        const endDateCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

        const startDateLastWeek = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
        const endDateLastWeek = endOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });


        const teamsCreatedThisWeek = await db.team.count({
            where: {
                projectId: projectId,
                createdAt: {
                    gte: startDateCurrentWeek,
                    lte: endDateCurrentWeek
                }
            },
        });


        const resourcesThisWeek = await db.team_content.aggregate({
            _sum: {
                resources: true,
            },
            where: {
                team: {
                    projectId: projectId,
                    createdAt: {
                        gte: startDateCurrentWeek,
                        lte: endDateCurrentWeek
                    }
                }
            }
        });


        const resourcesLastWeek = await db.team_content.aggregate({
            _sum: {
                resources: true,
            },
            where: {
                team: {
                    projectId: projectId,
                    createdAt: {
                        gte: startDateLastWeek,
                        lte: endDateLastWeek
                    }
                }
            }
        });


        const totalTeams = await db.team.count({
            where: {
                projectId: projectId,
            },
        });

        
        const totalResources = await db.team_content.aggregate({
            _sum: {
                resources: true,
            },
            where: {
                team: {
                    projectId: projectId,
                }
            }
        });

        return { 
            totalTeams,
            totalResources: totalResources._sum.resources,
            teamsCreatedThisWeek: teamsCreatedThisWeek, 
            resourcesCreatedThisWeek: resourcesThisWeek._sum.resources, 
        };

    } catch(error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

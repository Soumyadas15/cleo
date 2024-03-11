import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function POST(request: Request) {
    try {

        const currentUser = await initialProfile();

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
            return new Response('You dont have the necessary permissions', { status: 404 });
        }

        const body = await request.json();
        const { teamId, resources, role, availability, duration } = body;

        if (!teamId || !resources || !role || !availability || !duration) {
            return new Response('Missing required fields', { status: 400 });
        }

        const intResources = parseInt(resources, 10);
        const intAvailability = parseInt(availability, 10);
        const intDuration = parseInt(duration, 10);


        const team = await db.team.findUnique({
            where: {
                id: teamId,
            }
        })

        if (!team) {
            return new Response('Phase not found', { status: 400 });
        }

        const phaseContent = await db.team_content.create({
            data: {
                resources: intResources,
                role: role,
                availability: intAvailability,
                duration: intDuration,
                teamId: teamId,
            }
        })
    

        return new Response(JSON.stringify(phaseContent), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}

export async function PUT(request: Request) {
    try {
        const currentUser = await initialProfile();

        if (!currentUser) {
          return new Response('User not found', { status: 404 });
        }
    
        if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
          return new Response('You dont have the necessary permissions', { status: 404 });
        }

        const body = await request.json();
        const { teamContentId, resources, role, availability, duration } = body;

        if (!teamContentId || !resources || !role || !availability || !duration) {
            return new Response('Missing required fields', { status: 400 });
        }

        const intResources = parseInt(resources, 10);
        const intAvailability = parseInt(availability, 10);
        const intDuration = parseInt(duration, 10);


        const teamData = await db.team_content.findUnique({
            where: {
                id: teamContentId,
            }
        })

        if (!teamData) {
            return new Response('Phase data not found', { status: 400 });
        }

        const newTeamData = await db.team_content.update({
            where: {
                id: teamContentId,
            },
            data: {
                resources: intResources,
                role: role,
                availability: intAvailability,
                duration: intDuration,
            }
        })
    

        return new Response(JSON.stringify(newTeamData), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
    }
}
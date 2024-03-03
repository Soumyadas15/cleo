import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function POST(request: Request) {
    try {

        const currentUser = await initialProfile();

        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }

        const body = await request.json();
        const { phaseId, resources, role, availability, duration } = body;

        if (!phaseId || !resources || !role || !availability || !duration) {
            return new Response('Missing required fields', { status: 400 });
        }

        const intResources = parseInt(resources, 10);
        const intAvailability = parseInt(availability, 10);
        const intDuration = parseInt(duration, 10);


        const phase = await db.phase.findUnique({
            where: {
                id: phaseId,
            }
        })

        if (!phase) {
            return new Response('Phase not found', { status: 400 });
        }

        const phaseContent = await db.phase_content.create({
            data: {
                resources: intResources,
                role: role,
                availability: intAvailability,
                duration: intDuration,
                phaseId: phaseId,
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
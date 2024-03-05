import getUserByEmail from "@/actions/getUsers/getUserByEmail";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{

        const currentUser = await initialProfile();
        if (!currentUser) {
            return new Response("User not authenticated", { status: 401 });
        }

        if (currentUser.role !== "ADMIN") {
            return new Response("You don't have the required permissions", { status: 401 });
        }

        const body = await request.json();
        const { createdBy, name, manager, client, auditor } = body;

        console.log(body)

        if (!createdBy || !name || !manager || !client || !auditor) {
            return new Response("Missing required fields", { status: 400 });
        }

        const project = await db.project.create({
            //@ts-ignore
            data: {
                name: name,
                userId: createdBy,
            }
        })

        const projectManager = await getUserByEmail(manager);
        const projectClient = await getUserByEmail(client);
        const projectAuditor = await getUserByEmail(auditor);

        
        if (!projectAuditor || !projectClient || !projectClient) {
            return new Response("Users not found", { status: 400 });
        }
        
        await db.member.create({
            //@ts-ignore
            data: {
                role: 'MANAGER',
                userId: projectManager?.id,
                projectId: project.id,
            }
        });

        

        await db.member.create({
            //@ts-ignore
            data: {
                role: 'CLIENT',
                userId: projectClient?.id,
                projectId: project.id,
            }
        });

        await db.member.create({
            //@ts-ignore
            data: {
                role: 'AUDITOR',
                userId: projectAuditor?.id,
                projectId: project.id,
            }
        });

        await db.project.update({
            //@ts-ignore
            where: {
                id: project.id,
            },
            data: {
                projectManagerId: projectManager?.id,
                auditorId: projectAuditor?.id,
            }
        })


        return new Response(JSON.stringify(currentUser), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Error creating member');
        }
    }
}

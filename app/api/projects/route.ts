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

        if (!(currentUser.role === "ADMIN" || currentUser.role === "AUDITOR")) {
            return new Response("You don't have the required permissions", { status: 401 });
        }

        const body = await request.json();
        const { createdBy, name, description, scope, manager, client, auditor, type, duration, budgetedHours } = body;

        console.log(body)

        if (!createdBy || !name ||!description ||!scope ||!manager || !client || !auditor  ||!type || !duration || !budgetedHours) {
            return new Response("Missing required fields", { status: 400 });
        }

        const project = await db.project.create({
            //@ts-ignore
            data: {
                name: name,
                description: description,
                scope: scope,
                userId: createdBy,
                projectType: type,
                type: type,
                duration: duration,
                budgetedHours: budgetedHours,
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
                role: 'ADMIN',
                userId: currentUser?.id,
                projectId: project.id,
                name: currentUser?.name,
                imageUrl: currentUser?.imageUrl,
            }
        });
        
        await db.member.create({
            //@ts-ignore
            data: {
                role: 'MANAGER',
                userId: projectManager?.id,
                projectId: project.id,
                name: projectManager?.name,
                imageUrl: projectManager?.imageUrl,
            }
        });

        

        await db.member.create({
            //@ts-ignore
            data: {
                role: 'CLIENT',
                userId: projectClient?.id,
                projectId: project.id,
                name: projectClient?.name,
                imageUrl: projectClient?.imageUrl,
            }
        });

        await db.member.create({
            //@ts-ignore
            data: {
                role: 'AUDITOR',
                userId: projectAuditor?.id,
                projectId: project.id,
                name: projectAuditor?.name,
                imageUrl: projectAuditor?.imageUrl,
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
                clientId: projectClient?.id,
            }
        })

        const managerNotification = await db.notification.create({
            //@ts-ignore
            data: {
                text: `${currentUser.name} added you as a project manager in ${name}`,
                userId: projectManager?.id,
                projectId: project.id,
            }
        })

        const auditorNotification = await db.notification.create({
            //@ts-ignore
            data: {
                text: `${currentUser.name} added you as an auditor in ${name}`,
                userId: projectAuditor?.id,
                projectId: project.id,
            }
        })


        return new Response(JSON.stringify(project), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Error creating member');
        }
    }
}


export async function PUT(request: Request) {
    try  {

        const currentUser = await initialProfile();
        if (!currentUser) {
            return new Response("User not authenticated", { status: 401 });
        }

        if (!(currentUser.role === "ADMIN" || currentUser.role === "AUDITOR")) {
            return new Response("You don't have the required permissions", { status: 401 });
        }

        const body = await request.json();
        const { projectId, name, description, scope, type, duration, budgetedHours } = body;

        console.log(body)

        if (!projectId || !name ||!description ||!scope  ||!type || !duration || !budgetedHours) {
            return new Response("Missing required fields", { status: 400 });
        }

        const updatedPproject = await db.project.update({
            where : {
                id: projectId,
            },
            //@ts-ignore
            data: {
                name: name,
                description: description,
                scope: scope,
                projectType: type,
                type: type,
                duration: duration,
                budgetedHours: budgetedHours,
            }
        })

        return new Response(JSON.stringify(updatedPproject), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Error creating member');
        }
    }
}
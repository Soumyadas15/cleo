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

        if (!currentUser.isAdmin) {
            return new Response("You don't have the required permissions", { status: 401 });
        }

        const body = await request.json();
        const { createdBy, name, manager, clients } = body;

        if (!createdBy || !name || !manager || !clients) {
            return new Response("Missing required fields", { status: 400 });
        }

        const project = await db.project.create({
            //@ts-ignore
            data: {
                name: name,
                userId: createdBy,
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

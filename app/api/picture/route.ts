import getUserByEmail from "@/actions/getUsers/getUserByEmail";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try{

        const currentUser = await initialProfile();
        if (!currentUser) {
            return new Response("User not authenticated", { status: 401 });
        }

        const body = await request.json();
        const { imageUrl } = body;

        if (!imageUrl) {
            return new Response("Missing required fields", { status: 400 });
        }

        const user = await db.user.update({
            where: {
                //@ts-ignore
                id: currentUser.id,
            },
            data: { 
                imageUrl: imageUrl
            },
        })

        return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Error updating photo');
        }
    }
}
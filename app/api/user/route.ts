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

        const body = await request.json();
        const { userId, name } = body;

        if (!userId || !name) {
            return new Response("Missing required fields", { status: 400 });
        }

        const user = await db.user.update({
            where: {
                id: userId,
            },
            data: { 
                name: name 
            },
        })

        return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Error creating member');
        }
    }
}
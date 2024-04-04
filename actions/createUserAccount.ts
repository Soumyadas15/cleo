"use server"

import { db } from '@/lib/db';
import getUserByEmail from './getUsers/getUserByEmail';

export default async function createUserAccount(email: string,  name: string, imageUrl: string) {
    try {
        
        const user = await getUserByEmail(email);
        let newUser;

        if (!user){
            newUser = await db.user.create({
                //@ts-ignore
                data: {
                    email: email,
                    name: name,
                    imageUrl: imageUrl,
                },
            });
        }

        return user ? user : newUser;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
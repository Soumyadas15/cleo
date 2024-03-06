"use server"

import { db } from '@/lib/db';

export default async function getUserByEmail(email: string) {
    try {

        const user = await db.user.findFirst({
            //@ts-ignore
            where: {
                email: email,
            },
        });
        if (!user) {
            return null;
        }

        return {
            ...user,
            name: user.name,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export async function getManagers(){
    try {
        const managers = await db.user.findMany({
            where: {
                role: "MANAGER"
            }
        })

        if (!managers){
            return [];
        }

        return managers;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export async function getClients(){
    try {
        const clients = await db.user.findMany({
            where: {
                role: "CLIENT"
            }
        })

        if (!clients){
            return [];
        }

        return clients;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export async function getAuditors(){
    try {
        const auditors = await db.user.findMany({
            where: {
                role: "AUDITOR"
            }
        })

        if (!auditors){
            return [];
        }

        return auditors;
        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
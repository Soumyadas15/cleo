"use server"

import { db } from '@/lib/db';
import getUserByEmail from './getUsers/getUserByEmail';
import axios from 'axios';

export default async function createAuth0Account(
    email: string,  
    name: string, 
    password: string, 
    imageUrl: string, 
    accessToken: string
) {
    
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`;
    const data = {
        email: email,
        nickname: name,
        picture: imageUrl,
        connection: 'Username-Password-Authentication',
        password: password, 
    };
    const response = await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data
}

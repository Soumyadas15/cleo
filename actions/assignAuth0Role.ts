"use server"

import axios from 'axios';

export default async function assignAuth0Role(
    role: string, 
    userId: string, 
    accessToken: string
) {
    
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`;
    var data = JSON.stringify({
        "roles": [role]
    });

    const res = await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return res.data;
}

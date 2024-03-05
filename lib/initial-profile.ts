import { db } from "@/lib/db";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserProfileData } from "./profile-service";

export const initialProfile = async () => {

    const user = await getUserProfileData();
    
    console.log(user)

    const profile = await db.user.findUnique({
        where: {
            userId: user.sub
        }
    })

    if (profile) {
        return profile;
    }

    let userEmail;
    if (isEmail(user.nickname)){
        userEmail = user.nickname;
    }
    else{
        userEmail = user.name;
    }

    const newProfile = await db.user.create({
        data: {
            userId: user.sub,
            name: user.name,
            imageUrl: user.picture,
            email: userEmail
        }
    })

    return newProfile;
}


const isEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
}
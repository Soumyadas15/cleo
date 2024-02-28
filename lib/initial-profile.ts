import { db } from "@/lib/db";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserProfileData } from "./profile-service";

export const initialProfile = async () => {

    const user = await getUserProfileData();

    const profile = await db.user.findUnique({
        where: {
            userId: user.sub
        }
    })

    if (profile) {
        return profile;
    }

    const newProfile = await db.user.create({
        data: {
            userId: user.sub,
            name: user.name,
            imageUrl: user.picture,
            isAdmin: false,
            email: user.email
        }
    })

    return newProfile;
}
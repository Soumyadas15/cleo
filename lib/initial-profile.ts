import { db } from "@/lib/db";
import { getUserProfileData } from "./profile-service";
import { redirect } from "next/navigation";
import getManagementToken from "@/actions/mgt-token";
import getUser from "./get-user";
import { getUserRoles } from "./get-role";


class AuthenticationError extends Error {
  constructor(public redirectPath: string) {
    super('Authentication required');
    this.name = 'AuthenticationError';
  }
}

export const initialProfile = async () => {
  try {
    const user = await getUserProfileData();


    const existingProfile = await db.user.findUnique({
      where: {
        userId: user.sub,
      },
    });

    

    if (existingProfile) {
      return existingProfile;
    }

    const token = await getManagementToken();
    const myUser = await getUser(user.sub, token);
    const myRole = await getUserRoles(user.sub, token);
    
    let userEmail = isEmail(myUser.nickname) ? myUser.nickname : myUser.name;

    const profile = await db.user.upsert({
      where: {
        userId: user.sub,
      },
      update: {
        name: myUser.name,
        imageUrl: myUser.picture,
        email: userEmail,
        role: myRole[0].name,
      },
      create: {
        userId: user.sub,
        name: myUser.name,
        imageUrl: myUser.picture,
        email: userEmail,
        role: myRole[0].name,
      },
    });

    return profile;

  } catch (error) {
    if (error instanceof Error && error.message === 'Requires authentication') {
      redirect('/api/auth/login')
    } else {
      throw error;
    }
  }
};

const isEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};
import { db } from "@/lib/db";
import { getUserProfileData } from "./profile-service";
import { redirect } from "next/navigation";


class AuthenticationError extends Error {
  constructor(public redirectPath: string) {
    super('Authentication required');
    this.name = 'AuthenticationError';
  }
}

export const initialProfile = async () => {
  try {
    const user = await getUserProfileData();
    // Assume getUserProfileData throws an error if the user is not authenticated

    const existingProfile = await db.user.findUnique({
      where: {
        userId: user.sub,
      },
    });

    if (existingProfile) {
      return existingProfile;
    }

    let userEmail = isEmail(user.nickname) ? user.nickname : user.name;

    const profile = await db.user.upsert({
      where: {
        userId: user.sub,
      },
      update: {
        name: user.name,
        imageUrl: user.picture,
        email: userEmail,
      },
      create: {
        userId: user.sub,
        name: user.name,
        imageUrl: user.picture,
        email: userEmail,
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

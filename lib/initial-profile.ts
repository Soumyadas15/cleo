import { db } from "@/lib/db";
import { getUserProfileData } from "./profile-service";

export const initialProfile = async () => {
  const user = await getUserProfileData();

  const existingProfile = await db.user.findUnique({
    where: {
        userId: user.sub
    }
  })

  if (existingProfile) {
    return existingProfile;
  }

  let userEmail;
  if (isEmail(user.nickname)) {
    userEmail = user.nickname;
  } else {
    userEmail = user.name;
  }


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
};

const isEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

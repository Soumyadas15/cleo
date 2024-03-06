import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { NextApiResponseServerIo } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const currentUser = await initialProfile();
    
    if (!currentUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { createdBy, name, manager, client, auditor } = req.body;

    

   
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" }); 
  }
}
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


interface IParams {
    teamContentId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {

    const currentUser = await initialProfile();
    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
    }
      
    const { teamContentId } = params;
    
    console.log(teamContentId)

    
    if (!teamContentId) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.team_content.delete({
      where: {
        id: teamContentId,
      },
    });

    return new Response('Team content deleted successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

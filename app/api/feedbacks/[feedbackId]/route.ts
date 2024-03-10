import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";



/**
 * Deletes a feedback entry in the database.
 * Only users with the "ADMIN" or "MANAGER" role can create feedback.
 *
 * @param request - the incoming request
 * @returns a response containing the created feedback, or an error message
*/

interface IParams {
    feedbackId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {

    const currentUser = await initialProfile();
    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }
    //@ts-ignore
    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
   }
    
    const { feedbackId } = params;

    
    if (!feedbackId) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.feedback.delete({
      where: {
        id: feedbackId,
      },
    });

    return new Response('Feedback deleted successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

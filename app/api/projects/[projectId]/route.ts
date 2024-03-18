import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


interface IParams {
    projectId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {

    const currentUser = await initialProfile();
    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "AUDITOR")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
    }
    
    const { projectId } = params;

    
    if (!projectId) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.project.delete({
      where: {
        id: projectId,
      },
    });

    return new Response('Resource deleted successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

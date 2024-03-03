import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


interface IParams {
    momId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {

    const currentUser = await initialProfile();
    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    if (currentUser.role !== "MANAGER") {
        return new Response("You don't have the required permissions", { status: 401 });
    }
    
    const { momId } = params;

    
    if (!momId) {
      return new Response('Missing required fields', { status: 400 });
    }

    await db.mom.delete({
      where: {
        id: momId,
      },
    });

    return new Response('MoM deleted successfully', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

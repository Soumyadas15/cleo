import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function POST(request: Request) {
  try {

    const currentUser = await initialProfile();
    if (!currentUser) {
        return new Response("User not authenticated", { status: 401 });
    }

    //@ts-ignore
    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response("You don't have the required permissions", { status: 401 });
    }

    const content = await request.json();
    
    const { flowId, nodes, edges, isFlow } = content;
    console.log(content)

    
    // if (!flowId) {
    //   return new Response('Missing required fields', { status: 400 });
    // }

    // await db.workflow.update({
    //   where: {
    //     id: flowId,
    //   },
    //   data: {
    //     nodes,
    //     edges,
    //     flowPath: isFlow,
    //   }
    // });

    return new Response('Flow saved', { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

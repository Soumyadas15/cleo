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
      const nodesString = JSON.stringify(nodes);
      const edgesString = JSON.stringify(edges);
      const isFlowString = JSON.stringify(isFlow);
      
      if (!flowId || !nodes || !edges || isFlow === undefined) {
        return new Response('Missing required fields', { status: 400 });
      }
  
      await db.workflow.update({
        where: {
          id: flowId,
        },
        data: {
          nodes: nodesString,
          edges: edgesString,
          flowPath: isFlowString,
        }
      });
  
      return new Response('Flow saved', { status: 200 });
  
    } catch (error) {
      console.error("Error occurred:", error);
      if (error instanceof Error) {
          console.error("Error message:", error.message);
          return new Response(error.message, { status: 500 });
      } else {
          console.error("Unknown error occurred");
          return new Response('An unknown error occurred', { status: 500 });
      }
    }
  }
  
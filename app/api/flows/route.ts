import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function POST(request: Request) {
    try {
      const currentUser = await initialProfile();
  
      if (!currentUser) {
        return new Response('User not found', { status: 404 });
      }
  
      if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response('You dont have the necessary permissions', { status: 404 });
      }
  
      const content = await request.json();
      const { projectId, name, description, userId } = content;
  
      if (!projectId ||!name ||!description ||!userId) {
        return new Response('Missing required fields', { status: 400 });
      }
  
      const project = await db.project.findUnique({
          where: {
              id: projectId,
          }
      })
  
      if (!project) {
          return new Response('Project not found', { status: 400 });
      }
  
      const workflow = await db.workflow.create({
          data: {
              name: name,
              description: description,
              projectId: projectId,
              userId: userId,
          }
      }) 
  
      return new Response(JSON.stringify(workflow), { status: 200, headers: { 'Content-Type': 'application/json' } });
  
    } catch (error) {
      if (error instanceof Error) {
          return new Response(error.message, { status: 500 });
      } else {
          return new Response('An unknown error occurred', { status: 500 });
      }
    }
  }
  
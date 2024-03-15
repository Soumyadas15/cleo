import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function POST(request: Request){
    try {
        const currentUser = await initialProfile();
    
        if (!currentUser) {
          return new Response('User not found', { status: 404 });
        }

        if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
            return new Response('You dont have the necessary permissions', { status: 404 });
          }
    
        const body = await request.json();
        const { projectId, level, name, type } = body;
    
        if (!projectId ||!level ||!name || !type) {
          return new Response('Missing required fields', { status: 400 });
        }

        if (!(type === "FINANCIAL" || type === "OPERATIONAL" || type === "TECHNICAL")) {
            return new Response('Invalid matrix type', { status: 400 });
          }
    
        const project = await db.project.findUnique({
            where: {
                id: projectId,
            }
        })
    
        if (!project) {
            return new Response('Project not found', { status: 400 });
        }
    
        const escalationMatrix = await db.escalation_matrix.create({
            data: {
                level: level,
                type: type,
                name: name,
                projectId: projectId,
            }
        }) 
    
        return new Response(JSON.stringify(escalationMatrix), { status: 200, headers: { 'Content-Type': 'application/json' } });
    
      } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
      }
}

export async function PUT(request: Request){
    try {
        const currentUser = await initialProfile();
    
        if (!currentUser) {
          return new Response('User not found', { status: 404 });
        }

        if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
            return new Response('You dont have the necessary permissions', { status: 404 });
        }
    
        const body = await request.json();
        const { matrixId, level, name, type } = body;
    
        if (!matrixId ||!level ||!name || !type) {
          return new Response('Missing required fields', { status: 400 });
        }

        if (!(type === "FINANCIAL" || type === "OPERATIONAL" || type === "TECHNICAL")) {
            return new Response('Invalid matrix type', { status: 400 });
          }
    
        const escalationMatrix = await db.escalation_matrix.findUnique({
            where: {
                id: matrixId,
            }
        })
    
        if (!escalationMatrix) {
            return new Response('Matrix not found', { status: 400 });
        }
    
        const updatedEscalationMatrix = await db.escalation_matrix.update({
            where: {
                id: matrixId,
            },
            data: {
                level: level,
                type: type,
                name: name,
            }
        }) 
    
        return new Response(JSON.stringify(updatedEscalationMatrix), { status: 200, headers: { 'Content-Type': 'application/json' } });
    
      } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response('An unknown error occurred', { status: 500 });
        }
      }
}
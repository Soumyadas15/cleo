import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";



export async function POST(request: Request) {
  try {
    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response("You don't have the required permissions", { status: 401 });
    }

    const body = await request.json();
    const { projectId, title, name, contact } = body;

    if (!projectId ||!title ||!contact ||!name) {
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

    const stakeholder = await db.stakeholder.create({
        data: {
            title: title,
            name: name,
            contact: contact,
            projectId: projectId,
        }
    }) 

    return new Response(JSON.stringify(stakeholder), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}


export async function PUT(request: Request) {
  try {

    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }
    
    const body = await request.json();
    const { stakeholderId, title, name, contact } = body;

    if (!stakeholderId ||!title ||!contact ||!name) {
        return new Response('Missing required fields', { status: 400 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response("You don't have the required permissions", { status: 401 });
    }

    const stakeholder = await db.stakeholder.findUnique({
      where: {
        id: stakeholderId,
      },
    });

    if (!stakeholder) {
      return new Response('Stakeholder not found', { status: 404 });
    }

    const updatedStakeholder = await db.stakeholder.update({
      where: {
        id: stakeholderId,
      },
      data: {
        title: title,
        name: name,
        contact: contact,
      },
    });

    return new Response(JSON.stringify(updatedStakeholder), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
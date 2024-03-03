import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


export async function POST(request: Request) {
  try {
    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    const content = await request.json();
    const { projectId, date, body } = content;

    if (!projectId ||!date ||!body) {
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

    const update = await db.update.create({
        data: {
            date: date,
            body: body,
            projectId: projectId
        }
    }) 

    return new Response(JSON.stringify(update), { status: 200, headers: { 'Content-Type': 'application/json' } });

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
    const content = await request.json();
    const { updateId, date, body } = content;

    if (!updateId ||!date ||!body) {
      return new Response('Missing required fields', { status: 400 });
    }

    const update = await db.update.findUnique({
      where: {
        id: updateId,
      },
    });

    if (!update) {
      return new Response('Update not found', { status: 404 });
    }

    const newUpdate = await db.update.update({
      where: {
        id: updateId,
      },
      data: {
        date: date,
        body: body,
        isEdited: true,
      },
    });

    return new Response(JSON.stringify(newUpdate), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
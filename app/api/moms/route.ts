import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


/**
 * Creates an MoM.
 * Only users with the "ADMIN" or "MANAGER" role can update MoMs.
 *
 * @param request - the incoming request
 * @returns a response indicating the status and content of the updated MoM
*/


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
    const { projectId, duration, date, link, comments } = content;

    if (!projectId ||!duration ||!date ||!link ||!comments) {
      return new Response('Missing required fields', { status: 400 });
    }

    const intDuration = parseInt(duration, 10);


    const project = await db.project.findUnique({
        where: {
            id: projectId,
        }
    })

    if (!project) {
        return new Response('Project not found', { status: 400 });
    }

    const mom = await db.mom.create({
        data: {
            date: date,
            duration: intDuration,
            link: link,
            comments: comments,
            projectId: projectId,
        }
    }) 

    return new Response(JSON.stringify(mom), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}


/**
 * Updates an existing MoM.
 * Only users with the "ADMIN" or "MANAGER" role can update MoMs.
 *
 * @param request - the incoming request
 * @returns a response indicating the status and content of the updated MoM
*/


export async function PUT(request: Request) {
  try {

    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
    }

    const content = await request.json();
    const { momId, duration, date, link, comments } = content;

    if (!momId ||!duration ||!date ||!link ||!comments) {
      return new Response('Missing required fields', { status: 400 });
    }

    const intDuration = parseInt(duration, 10);

    const mom = await db.mom.findUnique({
      where: {
        id: momId,
      },
    });

    if (!mom) {
      return new Response('MoM not found', { status: 404 });
    }


    const updatedMom = await db.mom.update({
      where: {
        id: momId,
      },
      data: {
        duration: intDuration,
        date: date,
        link: link,
        comments: comments,
      },
    });

    return new Response(JSON.stringify(updatedMom), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
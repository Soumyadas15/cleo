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

    const body = await request.json();
    const { projectId, startDate, endDate, status, comments } = body;

    if (!projectId ||!startDate ||!endDate ||!status ||!comments) {
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

    const sprint = await db.sprint.create({
        data: {
            status: status,
            startDate: startDate,
            endDate: endDate,
            comments: comments,
            projectId: projectId,
        }
    }) 

    return new Response(JSON.stringify(sprint), { status: 200, headers: { 'Content-Type': 'application/json' } });

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

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
    }
    
    const body = await request.json();
    const { sprintId, startDate, endDate, status, comments } = body;

    if (!sprintId ||!startDate ||!endDate ||!status ||!comments) {
      return new Response('Missing required fields', { status: 400 });
    }

    const sprint = await db.sprint.findUnique({
      where: {
        id: sprintId,
      },
    });

    if (!sprint) {
      return new Response('Sprint details not found', { status: 404 });
    }

    const updatedSprint = await db.sprint.update({
      where: {
        id: sprintId,
      },
      data: {
        status: status,
        startDate: startDate,
        endDate: endDate,
        comments: comments,
    }
    });

    return new Response(JSON.stringify(updatedSprint), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
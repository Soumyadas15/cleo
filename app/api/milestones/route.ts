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
    const { projectId, 
        phase, 
        startDate, 
        completionDate, 
        approvalDate, 
        status, 
        revisedCompletionDate, 
        comments } = content;

    if (!projectId ||!phase ||!startDate ||!completionDate ||!approvalDate ||!status ||!revisedCompletionDate ||!comments) {
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

    const milestone = await db.milestone.create({
        data: {
            phase: phase,
            title: phase,
            startDate: startDate,
            completionDate: completionDate,
            approvalDate: approvalDate,
            status: status,
            revisedCompletionDate: revisedCompletionDate,
            comments: comments,
            projectId: projectId,
        }
    })

    return new Response(JSON.stringify(milestone), { status: 200, headers: { 'Content-Type': 'application/json' } });

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

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
        return new Response('You dont have the necessary permissions', { status: 404 });
      }
  
    const content = await request.json();
    const { milestoneId, 
        phase, 
        startDate, 
        completionDate, 
        approvalDate, 
        status, 
        revisedCompletionDate, 
        comments } = content;

    if (!milestoneId ||!phase ||!startDate ||!completionDate ||!approvalDate ||!status ||!revisedCompletionDate ||!comments) {
        return new Response('Missing required fields', { status: 400 });
    }


    const updatedMilestone = await db.milestone.update({
        where: {
            id: milestoneId,
        },
        data: {
            phase: phase,
            title: phase,
            startDate: startDate,
            completionDate: completionDate,
            approvalDate: approvalDate,
            status: status,
            revisedCompletionDate: revisedCompletionDate,
            comments: comments,
        }
    })
  

    return new Response(JSON.stringify(updatedMilestone), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
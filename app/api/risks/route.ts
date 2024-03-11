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
    const { projectId, type, description, severity, impact, remedial, status, closureDate } = body;

    if (!projectId ||!type ||!description ||!severity ||!impact ||!remedial ||!status ||!closureDate) {
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

    const risk = await db.risk.create({
        data: {
            type: type,
            description: description,
            severity: severity,
            impact: impact,
            remedialSteps: remedial,
            status: status,
            projectId: project.id
        }
    }) 

    return new Response(JSON.stringify(risk), { status: 200, headers: { 'Content-Type': 'application/json' } });

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
    const { riskId, type, description, severity, impact, remedial, status, closureDate } = body;

    if (!riskId ||!type ||!description ||!severity ||!impact ||!remedial ||!status ||!closureDate) {
      return new Response('Missing required fields', { status: 400 });
    }

    const risk = await db.risk.findUnique({
      where: {
        id: riskId,
      },
    });

    if (!risk) {
      return new Response('Risk details not found', { status: 404 });
    }

    const updatedRisk = await db.risk.update({
      where: {
        id: riskId,
      },
      data: {
        type: type,
        description: description,
        severity: severity,
        impact: impact,
        remedialSteps: remedial,
        status: status,
    }
    });

    return new Response(JSON.stringify(updatedRisk), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
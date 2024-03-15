import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function POST(request: Request) {
  try {
    const currentUser = await initialProfile();

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
  }

    const body = await request.json();
    const { 
        projectId, 
        version, 
        type, 
        change, 
        changeReason, 
        revisionDate, 
        approvalDate,
        approvedBy,
        createdBy,
    } = body;

    if (!projectId || !version || !type ||!change || !changeReason || !revisionDate || !approvalDate || !approvedBy || !createdBy) {
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

    const versionData = await db.version.create({
        data: {
          projectId: projectId,
          version: version,
          changeType: type,
          change: change,
          changeReason: changeReason,
          createdBy: createdBy,
          revisionDate: revisionDate,
          approvalDate: approvalDate,
          approvedBy: approvedBy,
        }
    }) 

    return new Response(JSON.stringify(versionData), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}


export async function GET(request: Request) {
    try {
        const queryParams = new URL(request.url).searchParams;
        const projectId = queryParams.get('projectId');
  
        if (!projectId) {
            return new Response('Missing projectId query parameter', { status: 400 });
        } 
    
      const audits = await db.audit.findMany({
        where: {
          projectId: projectId,
        },
      });
  
      return new Response(JSON.stringify(audits), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      if (error instanceof Error) {
          return new Response(error.message, { status: 500 });
      } else {
          return new Response('An unknown error occurred', { status: 500 });
      }
    }
}


/**
 * Handles PUT requests to the /api/audit endpoint.
 *
 * @param request - the incoming HTTP request
 * @returns a response containing the updated audit, or an error response
*/


export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
        versionId, 
        version, 
        type, 
        change, 
        changeReason, 
        revisionDate, 
        approvalDate,
        approvedBy,
        createdBy,
    } = body;

    if (!versionId || !version || !type ||!change || !changeReason || !revisionDate || !approvalDate || !approvedBy || !createdBy) {
      return new Response('Missing required fields', { status: 400 });
    }

    const foundVersion = await db.version.findUnique({
      where: {
        id: versionId,
      },
    });

    if (!foundVersion) {
      return new Response('Version not found', { status: 404 });
    }

    const updatedVersion = await db.version.update({
      where: {
        id: versionId,
      },
      data: {
        version: version,
        changeType: type,
        change: change,
        changeReason: changeReason,
        createdBy: createdBy,
        revisionDate: revisionDate,
        approvalDate: approvalDate,
        approvedBy: approvedBy,
      },
    });

    return new Response(JSON.stringify(updatedVersion), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
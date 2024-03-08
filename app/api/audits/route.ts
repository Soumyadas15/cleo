import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";



/**
 * Handles POST requests to the /api/audit endpoint.
 *
 * @param request - the incoming HTTP request
 * @returns a response containing the created audit, or an error response
*/


export async function POST(request: Request) {
  try {
    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    const body = await request.json();
    const { projectId, date, content } = body;

    if (!projectId ||!date ||!content) {
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

    const audit = await db.audit.create({
        data: {
            date: date,
            body: content,
            projectId: projectId,
        }
    }) 

    return new Response(JSON.stringify(audit), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

/**
 * Handles GET requests to the /api/audit endpoint.
 *
 * @param request - the incoming HTTP request
 * @returns a response containing a list of audits, or an error response
*/



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
    const { auditId, date, content } = body;

    if (!auditId || !content) {
      return new Response('Missing required fields', { status: 400 });
    }

    const audit = await db.audit.findUnique({
      where: {
        id: auditId,
      },
    });

    if (!audit) {
      return new Response('Audit not found', { status: 404 });
    }

    const updatedAudit = await db.audit.update({
      where: {
        id: auditId,
      },
      data: {
        body: content,
        isEdited: true,
      },
    });

    return new Response(JSON.stringify(updatedAudit), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
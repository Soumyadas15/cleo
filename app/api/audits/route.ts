import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { sendEmail } from "@/lib/mail";
import { format } from 'date-fns';


/**
 * Handles POST requests to the /api/audit endpoint.
 *
 * @param request - the incoming HTTP request
 * @returns a response containing the created audit, or an error response
*/


export async function POST(request: Request) {
  try {
    const currentUser = await initialProfile();

    if (!(currentUser.role === "ADMIN" || currentUser.role === "AUDITOR")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
  }

    const body = await request.json();
    const { projectId, date, comments, reviewedBy, reviewedSection, status, actionItems  } = body;

    if (!projectId || !date || !comments ||!reviewedBy || !reviewedSection || !status || !actionItems) {
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
          projectId: projectId,
          date: date,
          comments: comments,
          reviewedBy: reviewedBy,
          reviewedSection: reviewedSection,
          status: status,
          actionItem: actionItems,
        }
    }) 

    const client = await db.user.findUnique({
      where: {
        id: project.clientId!,
      }
    })

    await sendEmail(
          client?.email!, 
          audit, 
          client?.name!, 
          project,
          "a new audit has been added"
    )

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
    const { auditId, date, comments, reviewedBy, reviewedSection, status, actionItems  } = body;

    if (!auditId || !date || !comments ||!reviewedBy || !reviewedSection || !status || !actionItems) {
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
        comments: comments,
        date: date,
        isEdited: true,
        reviewedSection: reviewedSection,
        reviewedBy: reviewedBy,
        status: status,
        actionItem: actionItems,
      },
    });

    const project = await db.project.findUnique({
      where: {
        id: audit.projectId,
      }
    })

    const client = await db.user.findUnique({
      where: {
        id: project?.clientId!,
      }
    })

    await sendEmail(
          client?.email!, 
          audit, 
          client?.name!, 
          project!,
          `an existing audit from ${format(new Date(audit.createdAt), "MM dd yyyy")} has been updated.`
    )

    return new Response(JSON.stringify(updatedAudit), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
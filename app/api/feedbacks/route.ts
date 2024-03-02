import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";


export async function POST(request: Request) {
  try {
    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    const content = await request.json();
    const { projectId, type, body, action, date, closureDate } = content;

    if (!projectId ||!type ||!body ||!action ||!date ||!closureDate) {
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

    const feedback = await db.feedback.create({
        data: {
            type: type,
            body: body,
            action: action,
            date: date,
            closureDate: closureDate,
            projectId: projectId
        }
    }) 

    return new Response(JSON.stringify(feedback), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}

// export async function GET(request: Request) {
//     try {
//         const queryParams = new URL(request.url).searchParams;
//         const projectId = queryParams.get('projectId');
  
//         if (!projectId) {
//             return new Response('Missing projectId query parameter', { status: 400 });
//         } 
    
//       const audits = await db.audit.findMany({
//         where: {
//           projectId: projectId,
//         },
//       });
  
//       return new Response(JSON.stringify(audits), { status: 200, headers: { 'Content-Type': 'application/json' } });
//     } catch (error) {
//       if (error instanceof Error) {
//           return new Response(error.message, { status: 500 });
//       } else {
//           return new Response('An unknown error occurred', { status: 500 });
//       }
//     }
// }

export async function PUT(request: Request) {
  try {
    const content = await request.json();
    const { feedbackId, type, body, action, date, closureDate } = content;


    if (!feedbackId ||!type ||!body ||!action ||!date ||!closureDate) {
      return new Response('Missing required fields', { status: 400 });
    }

    const feedback = await db.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });

    if (!feedback) {
      return new Response('Audit not found', { status: 404 });
    }

    const updatedFeedback = await db.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        type: type,
        body: body,
        action: action,
        date: date,
        closureDate: closureDate,
      },
    });

    return new Response(JSON.stringify(updatedFeedback), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
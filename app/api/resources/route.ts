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
    const { projectId, name, role, comment, startDate, endDate } = body;

    if (!projectId ||!name ||!role ||!comment ||!startDate ||!endDate) {
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

    const resource = await db.resource.create({
        data: {
            name: name,
            role: role,
            comment: comment,
            startDate: startDate,
            endDate: endDate,
            projectId: projectId
        }
    }) 

    return new Response(JSON.stringify(resource), { status: 200, headers: { 'Content-Type': 'application/json' } });

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
    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response('User not found', { status: 404 });
    }

    if (!(currentUser.role === "ADMIN" || currentUser.role === "MANAGER")) {
      return new Response('You dont have the necessary permissions', { status: 404 });
    }
    
    const body = await request.json();
    const { resourceId, name, role, comment, startDate, endDate } = body;

    if (!resourceId ||!name ||!role ||!comment ||!startDate ||!endDate) {
      return new Response('Missing required fields', { status: 400 });
    }

    const resource = await db.resource.findUnique({
      where: {
        id: resourceId,
      },
    });

    if (!resource) {
      return new Response('Audit not found', { status: 404 });
    }

    const updatedResource = await db.resource.update({
      where: {
        id: resourceId,
      },
      data: {
        name: name,
        role: role,
        comment: comment,
        startDate: startDate,
        endDate: endDate,
        isEdited: true,
      },
    });

    return new Response(JSON.stringify(updatedResource), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
        return new Response(error.message, { status: 500 });
    } else {
        return new Response('An unknown error occurred', { status: 500 });
    }
  }
}
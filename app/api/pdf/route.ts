import { initialProfile } from '@/lib/initial-profile';
import { db } from '@/lib/db';
import { format } from "date-fns"

export async function POST(req: Request) {
  try {
    const currentUser = await initialProfile();

    if (!currentUser) {
      return new Response("User not authenticated", { status: 401 });
    }

    const body = await req.json();
    const { startDate, endDate, projectId } = body;

    if (!startDate || !endDate || !projectId) {
      return new Response("Missing required fields", { status: 400 });
    }

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        audits: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        resources: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        feedbacks: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        updates: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        moms: {
          orderBy: {
            createdAt: 'asc',
          },
        },

        stakeholders: {
          orderBy: {
            createdAt: 'asc',
          },
        }

      },
    });

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    const formattedAudits = project.audits.map(audit => ({
      Date: format(new Date(audit.createdAt), 'MM/dd/yyyy'),
      Body: audit.comments
    }));

    const formattedResources = project.resources.map(resource => ({
      Start: format(new Date(resource.startDate), 'MM/dd/yyyy'),
      End: format(new Date(resource.startDate), 'MM/dd/yyyy'),
      Body: resource.comment,
    }));

    const formattedFedbacks = project.feedbacks.map(feedback => ({
      Date: format(new Date(feedback.date), 'MM/dd/yyyy'),
      Body: feedback.body,
    }));

    const formattedUpdates = project.updates.map(update => ({
      Date: format(new Date(update.date), 'MM/dd/yyyy'),
      Body: update.body,
    }));

    const formattedMoms = project.moms.map(mom => ({
      Date: format(new Date(mom.date), 'MM/dd/yyyy'),
      Body: mom.comments,
    }));

    const stakeHolders = project.stakeholders.map(stakeholder => ({
      Title: stakeholder.title,
      Name: stakeholder.name,
      Contact: stakeholder.contact
    }));

    const responseData = {
      audits: formattedAudits,
      resources: formattedResources,
      feedbacks: formattedFedbacks,
      updates: formattedUpdates,
      moms: formattedMoms,
      stakeholders: stakeHolders
    };

    return new Response(JSON.stringify(responseData), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Error creating member');
    }
  }
}

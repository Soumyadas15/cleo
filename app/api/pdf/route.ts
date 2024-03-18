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
        //@ts-ignore
        sprints: {
          orderBy: {
            createdAt: 'asc',
          }
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
        },
        milestones: {
          orderBy: {
            createdAt: 'asc',
          }
        },
        risks: {
          orderBy: {
            createdAt: 'asc',
          }
        },
        versions: {
          orderBy: {
            createdAt: 'asc',
          }
        },
      },
    });

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    //@ts-ignore
    const formattedAudits = project.audits.map(audit => ({
      Date: format(new Date(audit.createdAt), 'MM/dd/yyyy'),
      Body: audit.comments
    }));


    //@ts-ignore
    const formattedResources = project.resources.map(resource => ({
      Name: resource.name,
      Start_Date: format(new Date(resource.startDate), 'MM/dd/yyyy'),
      End_Date: format(new Date(resource.startDate), 'MM/dd/yyyy'),
      Body: resource.comment,
    }));

    //@ts-ignore
    const formattedFedbacks = project.feedbacks.map(feedback => ({
      Date: format(new Date(feedback.date), 'MM/dd/yyyy'),
      Body: feedback.body,
      Action: feedback.action,
      Closure_Date: format(new Date(feedback.closureDate), 'MM/dd/yyyy'),
    }));

    //@ts-ignore
    const formattedUpdates = project.updates.map(update => ({
      Date: format(new Date(update.date), 'MM/dd/yyyy'),
      Body: update.body,
    }));
    //@ts-ignore
    const formattedSprints = project.sprints.map(sprint => ({
      Start_Date: format(new Date(sprint.startDate), 'MM/dd/yyyy'),
      End_Date: format(new Date(sprint.endDate), 'MM/dd/yyyy'),
      Status: sprint.status,
      Body: sprint.comments,
    }));
    //@ts-ignore
    const formattedMoms = project.moms.map(mom => ({
      Date: format(new Date(mom.date), 'MM/dd/yyyy'),
      Body: mom.comments,
    }));
    //@ts-ignore
    const stakeHolders = project.stakeholders.map(stakeholder => ({
      Title: stakeholder.title,
      Name: stakeholder.name,
      Contact: stakeholder.contact
    }));
    //@ts-ignore
    const formattedMilestones = project.milestones.map(milestone => ({
      Title: milestone.title,
      Start_Date: format(new Date(milestone.startDate), 'MM/dd/yyyy'),
      Completion_Date: format(new Date(milestone.completionDate), 'MM/dd/yyyy'),
      Approval_Date: format(new Date(milestone.approvalDate), 'MM/dd/yyyy'),
      Status: milestone.status,
      Revised_Completion_Date: format(new Date(milestone.revisedCompletionDate), 'MM/dd/yyyy'),
      Comments: milestone.comments,
    }));

    //@ts-ignore
    const formattedRiskProfile = project.risks.map(risk => ({
      Type: risk.type,
      Description: risk.description,
      Severity: risk.severity,
      Impact: risk.impact,
      Remedial: risk.remedialSteps,
      Status: risk.status,
      Closure_Date: risk.closureDate,
    }));

    //@ts-ignore
    const formattedVersion = project.versions.map(version => ({
      Version: version.version,
      Type: version.changeType,
      Change: version.change,
      Change_Reason: version.changeReason,
      Created_By: version.createdBy,
      Revision_Date: format(new Date(version.revisionDate), 'MM/dd/yyyy'),
      //@ts-ignore
      Approval_Date: format(new Date(version.approvalDate), 'MM/dd/yyyy'),
      Approved_By: version.approvedBy
    }));
    
    //@ts-ignore
    const responseData = {
      audits: formattedAudits,
      resources: formattedResources,
      feedbacks: formattedFedbacks,
      updates: formattedUpdates,
      moms: formattedMoms,
      stakeholders: stakeHolders,
      sprints: formattedSprints,
      milestones: formattedMilestones,
      risks: formattedRiskProfile,
      version: formattedVersion,
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

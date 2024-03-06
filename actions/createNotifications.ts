import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export async function createNoficiations(projectId: string, manager: any, auditor: any) {
    try{

        const currentUser = await initialProfile();

        if (!currentUser) {
            return new Response('Not authenticated', { status: 404 });
        }

        const project = await db.project.findUnique({
            where: {
                id: projectId,
            }
        })

        if (!project) {
            return new Response('Project not found', { status: 400 });
        }

        const projectManagerNotification = await db.notification.create({
            data: {
              message: `You have been assigned as the project manager for project "${project.name}"`,
              recipient: manager.email, 
              projectId: projectId,
              forRole: "MANAGER",
              userId:  manager.id,
            },
        });

        const auditorNotification = await db.notification.create({
            data: {
              message: `You have been assigned as the project manager for project "${project.name}"`,
              recipient: auditor.email, 
              projectId: projectId,
              forRole: "AUDITOR",
              userId: auditor.id,
            },
        });

        
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
  }
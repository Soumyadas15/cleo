import getAuditById from "@/actions/getAudits/getAuditById";
import getAudits from "@/actions/getAudits/getAudits";
import getProjectByAuditId from "@/actions/getProjects/getProjectByAuditId";
import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectByResourceId from "@/actions/getProjects/getProjectByResourceId";
import getResourceById from "@/actions/getResources/getResourceById";
import getResources from "@/actions/getResources/getResources";
import AuditModal from "@/components/modals/AuditModal";
import DeleteAuditModal from "@/components/modals/DeleteAuditModal";
import EditAuditModal from "@/components/modals/EditAuditModal";
import EditResourceModal from "@/components/modals/EditResourceModal";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import { AuditClient } from "@/components/pages/projects/audit/AuditClient";
import { ResourcesClient } from "@/components/pages/projects/resources/ResourcesClient";
import Heading from "@/components/reusable/Heading";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    resourceId?: string;
}

export default async function ResourceLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const { resourceId } = params;

    const user = await initialProfile();
    const project = await getProjectByResourceId(params);
    //@ts-ignore
    const resources = await getResources({ projectId: project.id });

    const resource = await getResourceById(params);


    return (  
        <div className="overflow-hidden h-[99%]">
            <ResourcesClient resources={resources} user={user} project={project}/>
            {children}
        </div>
    );
}
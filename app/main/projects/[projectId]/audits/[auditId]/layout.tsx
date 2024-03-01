import getAuditById from "@/actions/getAudits/getAuditById";
import getAudits from "@/actions/getAudits/getAudits";
import getProjectByAuditId from "@/actions/getProjects/getProjectByAuditId";
import getProjectById from "@/actions/getProjects/getProjectById";
import AuditModal from "@/components/modals/AuditModal";
import DeleteAuditModal from "@/components/modals/DeleteAuditModal";
import EditAuditModal from "@/components/modals/EditAuditModal";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import { AuditClient } from "@/components/pages/projects/audit/AuditClient";
import Heading from "@/components/reusable/Heading";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    auditId?: string;
}

export default async function AuditLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const { auditId } = params;

    const user = await initialProfile();
    const project = await getProjectByAuditId(params);
    //@ts-ignore
    const audits = await getAudits({ projectId: project.id });
    
    const audit = await getAuditById(params);

    console.log(audit)

    return (  
        <div className="overflow-hidden h-[99%]">
            <AuditClient audits={audits} user={user} project={project}/>
            <DeleteAuditModal audit={audit} project={project} />
            <EditAuditModal audit={audit}/>
            {children}
        </div>
    );
}
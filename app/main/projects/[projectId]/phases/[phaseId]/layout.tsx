import getAuditById from "@/actions/getAudits/getAuditById";
import getAudits from "@/actions/getAudits/getAudits";
import getPhaseById from "@/actions/getPhases/getPhaseById";
import getPhaseContentByPhaseIds from "@/actions/getPhases/getPhaseContentByPhaseId";
import getPhases from "@/actions/getPhases/getPhases";
import getProjectByAuditId from "@/actions/getProjects/getProjectByAuditId";
import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectByPhaseId from "@/actions/getProjects/getProjectByPhaseId";
import AuditModal from "@/components/modals/createModals/AuditModal";
import DeleteAuditModal from "@/components/modals/DeleteAuditModal";
import EditAuditModal from "@/components/modals/editModals/EditAuditModal";
import PhaseContentModal from "@/components/modals/createModals/PhaseContentModal";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import { AuditClient } from "@/components/pages/projects/audit/AuditClient";
import { PhaseContentsClient } from "@/components/pages/projects/phases/PhaseContentsClient";
import { PhaseContentsTable } from "@/components/pages/projects/phases/PhaseContentsTable";
import { PhasesClient } from "@/components/pages/projects/phases/PhasesClient";
import Heading from "@/components/reusable/Heading";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    phaseId?: string;
}

export default async function PhaseLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const { phaseId } = params;

    const user = await initialProfile();
    const project = await getProjectByPhaseId(params);

    //@ts-ignore
    const phases = await getPhases({ projectId: project.id })

    const phase = await getPhaseById(params);
    const phaseContents = await getPhaseContentByPhaseIds(params);


    return (  
        <div className="overflow-hidden h-[99%] flex flex-col justify-between">
            <PhaseContentModal phase={phase} user={user}/>
            <PhasesClient phases={phases} user={user} project={project} phase={phase}/>
            <div className="h-[90%] w-full">
                <PhaseContentsClient phaseContents={phaseContents} project={project} user={user}/>
            </div>
        </div>
    );
}
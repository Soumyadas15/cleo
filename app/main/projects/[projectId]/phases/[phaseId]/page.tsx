"use client"

import getAudits from "@/actions/getAudits/getAudits";
import getProjectByAuditId from "@/actions/getProjects/getProjectByAuditId";
import getProjectById from "@/actions/getProjects/getProjectById";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { AuditClient } from "@/components/pages/projects/audit/AuditClient";
import { Button } from "@/components/reusable/Button";
import usePhaseContentModal from "@/hooks/createModalHooks/usePhaseContentModal";
import { initialProfile } from "@/lib/initial-profile";


const PhasePage =  () => {

    const phaseContentModal = usePhaseContentModal();

    return (
        <div className="flex flex-col h-full">
            
        </div>
    )
}
export default PhasePage;
import getEscalationMatrix from "@/actions/getEscalationMatrix/getEscalationMatrix";
import getProjectById from "@/actions/getProjects/getProjectById";
import EmptyState from "@/components/pages/EmptyState";
import { EscalationClient } from "@/components/pages/projects/escalation/EscalationCLient";
import { EscalationMatrixTable } from "@/components/pages/projects/escalation/EscalationMatrixTable";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const TechnicalEscalationPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const { projectId } = params;
    const user = await initialProfile();
    const escalationMatrix = await getEscalationMatrix({ projectId: projectId, type: "TECHNICAL" });

    //@ts-ignore
    if (escalationMatrix.length === 0) {
        return (
            <div className="flex flex-col h-full w-full">
                <EmptyState title="Matrix is empty"/>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full">
            <EscalationMatrixTable project={project!} user={user} matrices={escalationMatrix}/>
        </div>
    )
}
export default TechnicalEscalationPage;
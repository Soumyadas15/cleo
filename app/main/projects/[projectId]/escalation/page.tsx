import getProjectById from "@/actions/getProjects/getProjectById";
import EmptyState from "@/components/pages/EmptyState";
import { EscalationClient } from "@/components/pages/projects/escalation/EscalationCLient";

interface IParams {
    projectId?: string;
}

const EscalationPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <div className="flex flex-col">
            <EscalationClient project={project}/>
        </div>
    )
}
export default EscalationPage;
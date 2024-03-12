import getProjectById from "@/actions/getProjects/getProjectById";
import EmptyState from "@/components/pages/EmptyState";
import { EscalationClient } from "@/components/pages/projects/escalation/EscalationCLient";
import { EscalationHome } from "@/components/pages/projects/escalation/escalationHome/EscalationHome";

interface IParams {
    projectId?: string;
}

const EscalationPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <div className="flex flex-col scrollbar-hide h-full w-full ">
           <EscalationHome/>
        </div>
    )
}
export default EscalationPage;
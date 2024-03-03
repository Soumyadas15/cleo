import getAudits from "@/actions/getAudits/getAudits";
import getProjectById from "@/actions/getProjects/getProjectById";
import { AuditClient } from "@/components/pages/projects/audit/AuditClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const AuditsPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const audits = await getAudits(params);
    const user = await initialProfile();

    return (
        <div className="flex flex-col h-full">
            <AuditClient audits={audits} user={user} project={project}/>
        </div>
    )
}
export default AuditsPage;
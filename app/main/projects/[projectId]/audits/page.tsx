import getProjectById from "@/actions/getProjects/getProjectById";
import AuditTable from "@/components/pages/projects/audit/AuditTable";

interface IParams {
    projectId?: string;
}

const AuditsPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <div className="flex flex-col">
            <AuditTable/>
        </div>
        
    )
}
export default AuditsPage;
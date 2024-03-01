import getProjectById from "@/actions/getProjects/getProjectById";
import { StakeholdersClient } from "@/components/pages/projects/stakeholders/StakeholdersClient";

interface IParams {
    projectId?: string;
}

const StakeholdersPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
         <div className="flex flex-col">
            <StakeholdersClient project={project}/>
        </div>
    )
}
export default StakeholdersPage;
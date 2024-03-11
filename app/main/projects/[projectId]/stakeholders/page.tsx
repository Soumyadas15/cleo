import getProjectById from "@/actions/getProjects/getProjectById";
import getStakeholders from "@/actions/getStakeholders.ts/getStakeholders";
import { StakeholdersClient } from "@/components/pages/projects/stakeholders/StakeholdersClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const StakeholdersPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const stakeholders = await getStakeholders(params);
    const user = await initialProfile();

    return (
         <div className="flex flex-col">
            <StakeholdersClient 
                //@ts-ignore
                project={project} 
                stakeholders={stakeholders} 
                user={user}
            />
        </div>
    )
}
export default StakeholdersPage;
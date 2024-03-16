import getMoms from "@/actions/getMoms/getMoms";
import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import getResources from "@/actions/getResources/getResources";
import getSprints from "@/actions/getSprints/getSprints";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { MomsClient } from "@/components/pages/projects/moms/MomClient";
import { SprintClient } from "@/components/pages/projects/sprints/SprintClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const SprintsPage = async (
    { params } : { params: IParams}
) => {

    const user = await initialProfile()
    const projects = await getProjectsByUserId();
    const sprints = await getSprints(params);
    const project = await getProjectById(params);
    
    return (  
        <div className="flex flex-col h-full">
            <SprintClient sprints={sprints} user={user} project={project}/>
        </div>
    );
}
 
export default SprintsPage;
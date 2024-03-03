import getMoms from "@/actions/getMoms/getMoms";
import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import getResources from "@/actions/getResources/getResources";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { MomsClient } from "@/components/pages/projects/moms/MomClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const MomsPage = async (
    { params } : { params: IParams}
) => {

    const user = await initialProfile()
    const projects = await getProjectsByUserId();
    const moms = await getMoms(params);
    const project = await getProjectById(params);
    
    return (  
        <div className="flex flex-col h-full">
            <MomsClient moms={moms} user={user} project={project}/>
        </div>
    );
}
 
export default MomsPage;
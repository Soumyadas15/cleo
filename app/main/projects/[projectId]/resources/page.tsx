import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import getResources from "@/actions/getResources/getResources";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { ResourcesClient } from "@/components/pages/projects/resources/ResourcesClient";
import { initialProfile } from "@/lib/initial-profile";


interface IParams {
    projectId?: string;
}

const ResourcesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const resources = await getResources(params);
    
    
    return (  
        <div className="flex flex-col h-full">
            <ResourcesClient resources={resources} user={user} project={project}/>
        </div>
    );
}
 
export default ResourcesPage;
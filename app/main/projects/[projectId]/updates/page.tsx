import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import getUpdates from "@/actions/getUpdates/getUpdates";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { UpdatesClient } from "@/components/pages/projects/updates/UpdatesClient";
import { initialProfile } from "@/lib/initial-profile";


interface IParams {
    projectId?: string;
}

const UpdatesPage = async (
    { params } : { params: IParams}
) => {

    const user = await initialProfile()
    const project = await getProjectById(params);
    const updates = await getUpdates(params);
    
    return (  
        <div className="flex flex-col h-full">
            <UpdatesClient updates={updates} user={user} project={project}/>
        </div>
    );
}
 
export default UpdatesPage;
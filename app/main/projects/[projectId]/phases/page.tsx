import getPhases from "@/actions/getPhases/getPhases";
import getProjectById from "@/actions/getProjects/getProjectById";
import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { PhasesClient } from "@/components/pages/projects/phases/PhasesClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const PhasesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const phases = await getPhases(params);
    

    
    return (  
        <div className="flex flex-col h-full">
            <PhasesClient phases={phases} project={project} user={user}/>
        </div>
    );
}
 
export default PhasesPage;
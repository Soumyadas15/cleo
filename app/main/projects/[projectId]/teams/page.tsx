import getPhases from "@/actions/getTeams/getTeams";
import getProjectById from "@/actions/getProjects/getProjectById";
import { initialProfile } from "@/lib/initial-profile";
import { TeamsClient } from "@/components/pages/projects/teams/TeamsClient";
import getTeams from "@/actions/getTeams/getTeams";

interface IParams {
    projectId?: string;
}

const PhasesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const teams = await getTeams(params);

    
    return (  
        <div className="flex flex-col h-full">
            
            <TeamsClient teams={teams} project={project} user={user}/>
            {/* <PhasesHome/> */}
        </div>
    );
}
 
export default PhasesPage;
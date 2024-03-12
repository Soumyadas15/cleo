import getPhases from "@/actions/getTeams/getTeams";
import getProjectById from "@/actions/getProjects/getProjectById";
import { initialProfile } from "@/lib/initial-profile";
import { TeamsClient } from "@/components/pages/projects/teams/TeamsClient";
import getTeams from "@/actions/getTeams/getTeams";
import { TeamHome } from "@/components/pages/projects/teams/teamHome/TeamHome";
import getTotalTeams from "@/actions/getTeams/getTotalTeams";

interface IParams {
    projectId?: string;
}

const PhasesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const teams = await getTeams(params);

    //@ts-ignore
    const { totalTeams, totalResources, teamsCreatedThisWeek, resourcesCreatedThisWeek } = await getTotalTeams(params);

    
    //@ts-ignore
    if(teams.length > 0){
        return (  
            <div className="flex flex-col h-full w-full ">
                <TeamHome 
                    totalPhases={totalTeams} 
                    phasesCreatedThisWeek={teamsCreatedThisWeek} 
                    totalResources={totalResources} 
                    resourcesCreatedThisWeek={resourcesCreatedThisWeek}
                />
            </div>
        );
    }
}
 
export default PhasesPage;
import { TeamContentsClient } from "@/components/pages/projects/teams/TeamContentsClient";
import { TeamsClient } from "@/components/pages/projects/teams/TeamsClient";
import { initialProfile } from "@/lib/initial-profile";
import getProjectByTeamId from "@/actions/getProjects/getProjectByTeamId";
import getTeams from "@/actions/getTeams/getTeams";
import getTeamById from "@/actions/getTeams/getTeamById";
import getTeamContentByTeamId from "@/actions/getTeams/getTeamContentByTeamId";
import TeamContentModal from "@/components/modals/createModals/TeamContentModal";

interface IParams {
    teamId?: string;
}

export default async function PhaseLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const { teamId } = params;

    const user = await initialProfile();
    const project = await getProjectByTeamId(params);

    //@ts-ignore
    const teams = await getTeams({ projectId: project.id })

    const team = await getTeamById(params);
    const teamContents = await getTeamContentByTeamId(params);


    return (  
        <div className="overflow-hidden h-[99%] flex flex-col justify-between">
            <TeamContentModal team={team} user={user}/>
            <TeamsClient teams={teams} user={user} project={project} team={team}/>
            <div className="h-[88%] w-full">
                <TeamContentsClient teamContents={teamContents} project={project} user={user}/>
            </div>
        </div>
    );
}
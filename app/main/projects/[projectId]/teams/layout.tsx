import getProjectById from "@/actions/getProjects/getProjectById";
import getTeams from "@/actions/getTeams/getTeams";
import { TeamsClient } from "@/components/pages/projects/teams/TeamsClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
  projectId?: string;
}

export default async function EscalationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: IParams;
}>) {

  const project = await getProjectById(params);
  const user = await initialProfile();
  const teams = await getTeams(params);

    return (  
        <div className="w-full h-full ">
            <div className="w-full h-[10%]">
              <TeamsClient teams={teams} project={project} user={user}/>
            </div>
            <div className="w-full h-[90%]">
              {children}
            </div>
        </div>
    );
}
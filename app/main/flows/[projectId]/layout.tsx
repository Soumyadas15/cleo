import getProjectById from "@/actions/getProjects/getProjectById";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import { initialProfile } from "@/lib/initial-profile";
import getMembers from "@/actions/getMembers/getMembers";
import { ProjectHeader } from "@/components/pages/projects/ProjectHeader";
import Heading from "@/components/reusable/Heading";
import { FlowsTitle } from "@/components/pages/flows/FlowsTitle";
import { Button } from "@/components/ui/button";
import { CreateFlow } from "@/components/pages/flows/CreateFLow";

interface IParams {
    projectId?: string;
}

export default async function ProjectLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const members = await getMembers(params);

    return (  
        <div className="w-full h-full pr-4 pb-2 flex items-center flex-col justify-between">
            <div className="w-full pl-5  h-[10%] flex items-center justify-between">
                <FlowsTitle project={project!}/>
                <CreateFlow project={project!} user={user}/>
            </div>
            
            {children}
        </div>
        
    );
}
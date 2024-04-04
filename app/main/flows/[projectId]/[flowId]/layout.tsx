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

export default async function FlowLayout({
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
        <div className="w-full h-full overflow-hidden">
            {children}
        </div>
        
    );
}
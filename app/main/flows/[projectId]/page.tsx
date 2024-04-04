import getFlows from "@/actions/flows/getFlows";
import getProjectById from "@/actions/getProjects/getProjectById";
import { FlowsClient } from "@/components/pages/flows/FlowsClient";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}


const ProjectFLowsPage = async ({
    params,
}: Readonly<{
    params: IParams;
  }>) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const flows = await getFlows(params);

    return (
        <div className=" h-full w-full pl-5 pr-5">
            
            <FlowsClient 
                project={project!} 
                user={user} 
                //@ts-ignore
                flows={flows}
            />
        </div>
    )
}
export default ProjectFLowsPage
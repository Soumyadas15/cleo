import getProjectByResourceId from "@/actions/getProjects/getProjectByResourceId";
import getResourceById from "@/actions/getResources/getResourceById";
import getResources from "@/actions/getResources/getResources";
import { ResourcesClient } from "@/components/pages/projects/resources/ResourcesClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    resourceId?: string;
}

export default async function ResourceLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {

    const { resourceId } = params;

    const user = await initialProfile();
    const project = await getProjectByResourceId(params);
    //@ts-ignore
    const resources = await getResources({ projectId: project.id });


    return (  
        <div className="overflow-hidden h-[99%]">
            <ResourcesClient resources={resources} user={user} project={project}/>
            {children}
        </div>
    );
}
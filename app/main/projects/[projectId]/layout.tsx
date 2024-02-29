import getProjectById from "@/actions/getProjects/getProjectById";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import Heading from "@/components/reusable/Heading";

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

    const project = await getProjectById(params)

    return (  
        <div className="p-5 h-full w-full">
            <div className="h-[5%]">
                <Heading title={`${project?.name}`}/>
            </div>
            <div className="h-[5%]">
                <ProjectNavbar project={project}/>
            </div>
            
            <div className="w-full h-[88%] pt-5">
                {children}
            </div>
            
        </div>
    );
}
import getProjectById from "@/actions/getProjects/getProjectById";
import AuditModal from "@/components/modals/AuditModal";
import EditAuditModal from "@/components/modals/EditAuditModal";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import Heading from "@/components/reusable/Heading";
import { initialProfile } from "@/lib/initial-profile";

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

    return (  
        <>
        <AuditModal project={project} user={user}/>
        <div className="p-5 h-full w-full">
            <div className="h-[5%]">
                <Heading title={`${project?.name}`}/>
            </div>
            <div className="h-[5%]">
                <ProjectNavbar project={project}/>
            </div>
            
            <div className="w-full h-[88%] pt-5 overflow-hidden overflow-y-scroll scrollbar-hide">
                {children}
            </div>
            
        </div>
        </>
        
    );
}
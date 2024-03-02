import getProjectById from "@/actions/getProjects/getProjectById";
import AuditModal from "@/components/modals/AuditModal";
import EditAuditModal from "@/components/modals/EditAuditModal";
import FeedbackModal from "@/components/modals/FeedbackModal";
import ResourceModal from "@/components/modals/ResourceModal";
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
        <ResourceModal project={project} user={user}/>
        <FeedbackModal project={project} user={user}/>
        
        <div className="p-5 h-full w-full">
            <div className="h-[5%]">
                <Heading title={`${project?.name}`}/>
            </div>
            <div className="h-[5%]">
                <ProjectNavbar project={project} user={user}/>
            </div>
            
            <div className="w-full h-[88%] pt-5 overflow-hidden overflow-y-scroll scrollbar-hide">
                {children}
            </div>
            
        </div>
        </>
        
    );
}
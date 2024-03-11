import getProjectById from "@/actions/getProjects/getProjectById";
import AuditModal from "@/components/modals/createModals/AuditModal";
import FeedbackModal from "@/components/modals/createModals/FeedbackModal";
import MomModal from "@/components/modals/createModals/MomModal";
import ResourceModal from "@/components/modals/createModals/ResourceModal";
import UpdateModal from "@/components/modals/createModals/UpdateModal";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import Heading from "@/components/reusable/Heading";
import { initialProfile } from "@/lib/initial-profile";
import StakeholderModal from "@/components/modals/createModals/StakeholderModal";
import RiskModal from "@/components/modals/createModals/RiskModal";

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
        <UpdateModal project={project} user={user}/>
        <MomModal project={project} user={user}/>
        <StakeholderModal project={project} user={user}/>
        <RiskModal project={project} user={user}/>

        <div className="p-5 h-full w-full flex flex-col justify-between scrollbar-hide">
            <div className="h-[5%] flex items-center">
                <Heading title={`${project?.name}`}/>
            </div>
            <div className="h-[5%] flex items-center">
                <ProjectNavbar project={project} user={user}/>
            </div>
            
            <div className="w-full h-[90%] flex justify-start pt-5 overflow-hidden overflow-y-scroll scrollbar-hide">
                {children}
            </div>
            
        </div>
        </>
        
    );
}
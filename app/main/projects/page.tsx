import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { initialProfile } from "@/lib/initial-profile";

const ProjectsPage = async () => {

    const user = await initialProfile()
    const projects = await getProjectsByUserId();
    
    return (  
        <div className="p-5 h-full w-full">
            <ProjectClient projects={projects} user={user}/>
        </div>
    );
}
 
export default ProjectsPage;
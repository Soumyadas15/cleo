import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import EmptyState from "@/components/pages/EmptyState";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { initialProfile } from "@/lib/initial-profile";

const PhasesPage = async () => {

    const user = await initialProfile()
    const projects = await getProjectsByUserId();
    
    return (  
        <div className="flex flex-col h-full bg-red-400">
            <EmptyState 
                title="Work underway"
            />
        </div>
    );
}
 
export default PhasesPage;
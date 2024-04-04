import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import getUsers from "@/actions/getUsers/getUsers";
import EmptyState from "@/components/pages/EmptyState";
import { DashboardHome } from "@/components/pages/dashboard/DashboardHome";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { ProjectItem } from "@/components/pages/projects/ProjectItem";
import Heading from "@/components/reusable/Heading";
import { initialProfile } from "@/lib/initial-profile";

const FlowsPage = async () => {

    const user = await initialProfile()
    const projects = await getProjectsByUserId();
    const { managers, auditors, clients } = await getUsers();

    if (!projects) {
        return (  
            <div className="p-5 h-full w-full">
                <EmptyState 
                    title="Work underway"
                />
            </div>
        );
    }

    return (
        <div className="p-5 h-full w-full scrollbar-hide">
            <Heading  
                title="Workflows"
                subtitle="Click on a project to see its workflows"
            />
            <div className="overflow-hidden overflow-y-scroll w-full h-[92%] mt-2 mb-2 scrollbar-hide">
                {projects && projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                        {projects.map((project: any, index: number) => (
                            <div key={index} className="flex flex-col mt-2">
                                <ProjectItem project={project} user={user} redirect = {`/main/flows/${project.id}`}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <EmptyState
                            title="No projects found"
                        />
                    </div>
                )}
            </div> 
        </div>
    )
}
 
export default FlowsPage;
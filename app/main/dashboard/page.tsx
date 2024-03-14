import getProjectsByUserId from "@/actions/getProjects/getProjectByUserId";
import getUsers from "@/actions/getUsers/getUsers";
import EmptyState from "@/components/pages/EmptyState";
import { DashboardHome } from "@/components/pages/dashboard/DashboardHome";
import { ProjectClient } from "@/components/pages/projects/ProjectClient";
import { initialProfile } from "@/lib/initial-profile";

const DashboardPage = async () => {

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
        <div className="p-5 h-full w-full">
            <DashboardHome projects={projects} clients={clients} auditors={auditors} managers={managers}/>
        </div>
    )
}
 
export default DashboardPage;
import getMilestones from "@/actions/getMilestones/getMilestones";
import getProjectById from "@/actions/getProjects/getProjectById";
import { MilestonesClient } from "@/components/pages/projects/milestones/MilestonesClient";
import { initialProfile } from "@/lib/initial-profile";
import { Milestone } from "@prisma/client";

interface IParams {
    projectId?: string;
}

const MilestonesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();

    const milestones = await getMilestones(params);

    return (
        <div className="flex flex-col">
            <MilestonesClient 
                project={project!} 
                user={user} 
                //@ts-ignore
                milestones={milestones}
            />
        </div>
    )
}
export default MilestonesPage;
import getProjectById from "@/actions/getProjects/getProjectById";
import { MilestonesClient } from "@/components/pages/projects/milestones/MilestonesClient";

interface IParams {
    projectId?: string;
}

const MilestonesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <div className="flex flex-col">
            <MilestonesClient project={project}/>
        </div>
    )
}
export default MilestonesPage;
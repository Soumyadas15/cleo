import getProjectById from "@/actions/getProjects/getProjectById";
import { ScopeClient } from "@/components/pages/projects/scope/ScopeClient";

interface IParams {
    projectId?: string;
}

const ScopePage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <div className="flex flex-col">
            <ScopeClient project={project}/>
        </div>
    )
}
export default ScopePage;
import getProjectById from "@/actions/getProjects/getProjectById";
import { RisksClient } from "@/components/pages/projects/risks/RisksClient";

interface IParams {
    projectId?: string;
}

const RisksPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <div className="flex flex-col">
            <RisksClient project={project}/>
        </div>
    )
}
export default RisksPage;
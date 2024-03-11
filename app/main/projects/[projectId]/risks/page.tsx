import getProjectById from "@/actions/getProjects/getProjectById";
import getRisks from "@/actions/getRisks/getRisks";
import { RisksClient } from "@/components/pages/projects/risks/RisksClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const RisksPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();
    const risks = await getRisks(params);

    return (
        <div className="flex flex-col">
            <RisksClient project={project} risks={risks} user={user}/>
        </div>
    )
}
export default RisksPage;
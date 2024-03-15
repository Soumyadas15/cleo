import getProjectById from "@/actions/getProjects/getProjectById";
import getVersions from "@/actions/getVersions/getVersions";
import { MilestonesClient } from "@/components/pages/projects/milestones/MilestonesClient";
import { VersionClient } from "@/components/pages/projects/versions/VersionClient";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const VersionsPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const versions = await getVersions(params);
    const user = await initialProfile();

    return (
        <div className="flex flex-col">
            <VersionClient user={user} project={project} versions={versions}/>
        </div>
    )
}
export default VersionsPage;
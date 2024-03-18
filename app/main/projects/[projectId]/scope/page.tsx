import getProjectById from "@/actions/getProjects/getProjectById";
import { ScopeClient } from "@/components/pages/projects/scope/ScopeClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initialProfile } from "@/lib/initial-profile";

interface IParams {
    projectId?: string;
}

const ScopePage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);
    const user = await initialProfile();

    return (
        <div className="flex w-full h-full flex-col">
          <ScopeClient project={project!} user={user}/>
        </div>
    )
}
export default ScopePage;
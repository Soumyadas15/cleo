import getProjectById from "@/actions/getProjects/getProjectById";
import { ProjectNavbar } from "@/components/pages/projects/ProjectNavbar";
import Heading from "@/components/reusable/Heading";

interface IParams {
    projectId?: string;
}

const ProjectPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params)

    return (  
        <div className="w-full h-full scrollbar-hide"></div>
    );
}
export default ProjectPage;
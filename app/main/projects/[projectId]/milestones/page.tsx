import getProjectById from "@/actions/getProjects/getProjectById";

interface IParams {
    projectId?: string;
}

const MilestonesPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <h1 className="font-bold text-md">
            Milestones for {project?.name}
        </h1>
    )
}
export default MilestonesPage;
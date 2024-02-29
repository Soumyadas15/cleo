import getProjectById from "@/actions/getProjects/getProjectById";

interface IParams {
    projectId?: string;
}

const EscalationPage = async (
    { params } : { params: IParams}
) => {

    const project = await getProjectById(params);

    return (
        <h1 className="font-bold text-md">
            Escalation matrix for {project?.name}
        </h1>
    )
}
export default EscalationPage;